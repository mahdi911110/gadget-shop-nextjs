import Database from 'better-sqlite3';
import bcrypt from 'bcrypt';
import dayjs from 'dayjs';

const db = new Database('shop.db');

db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone_number TEXT UNIQUE NOT NULL,
    address TEXT NOT NULL,
    country TEXT NOT NULL,
    city TEXT NOT NULL,
    birthday TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL,
    is_active INTEGER NOT NULL DEFAULT 1,
    role TEXT NOT NULL DEFAULT 'user'
  );
  
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name TEXT NOT NULL,
    price_cents INTEGER NOT NULL CHECK (price_cents >= 0),
    stock INTEGER NOT NULL CHECK (stock >= 0),
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS carts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER UNIQUE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
  
  CREATE TABLE IF NOT EXISTS cart_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cart_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity >= 1),
    delivery_option INTEGER NOT NULL DEFAULT 0 CHECK (delivery_option IN (0, 1, 2)),
    UNIQUE (cart_id, product_id),
    FOREIGN KEY (cart_id) REFERENCES carts(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
    );
    
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL CHECK (quantity >= 1),
      price_cents INTEGER NOT NULL CHECK (price_cents >= 0),
      delivery_option INTEGER NOT NULL DEFAULT 0 CHECK (delivery_option IN (0, 1, 2)),
    UNIQUE (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
  );

  CREATE TABLE IF NOT EXISTS session (
    id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    expire_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

export async function createAdmin() {
  const existingAdmin = db.prepare(`
    SELECT id FROM users WHERE username = ?
  `).get('admin');
  
  if (existingAdmin) {
    return;
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    throw new Error('ADMIN_PASSWORD environment variable is not set.');
  }

  const passwordHash = await bcrypt.hash(adminPassword, 12);
  
  const insert = db.prepare(`
    INSERT INTO users(
      username,
      email,
      phone_number,
      address,
      country,
      city,
      birthday,
      password_hash,
      created_at,
      role
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  insert.run(
    'admin',
    'Null',
    'Null',
    'Null',
    'Null',
    'Null',
    'Null',
    passwordHash,
    dayjs().format('YYYY-MM-DD HH:mm:ss'),
    'admin'
  );
}

export async function signup(
  username: string,
  email: string,
  phone_number: string,
  address: string,
  country: string,
  city: string,
  birthday: string,
  password: string,
  ) {
  let find = db.prepare(`
    SELECT id FROM users WHERE username = ?
  `).get(username);

  if (find) {
    return { error: 'username exists! type another username.' }
  }

  find = db.prepare(`
    SELECT id FROM users WHERE email = ?
  `).get(email);

  if (find) {
    return { error: 'email exists! type another email.' }
  }

  find = db.prepare(`
    SELECT id FROM users WHERE phone_number = ?
  `).get(phone_number);

  if (find) {
    return { error: 'phone number exists! type another phone number.' }
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const insert = db.prepare(`
    INSERT INTO users (
      username,
      email,
      phone_number,
      address,
      country,
      city,
      birthday,
      password_hash,
      created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insert.run(
    username,
    email,
    phone_number,
    address,
    country,
    city,
    birthday,
    passwordHash,
    dayjs().format('YYYY-MM-DD HH:mm:ss')
  );

  return null;
}

export function addProduct(
    productName: string,
    price_cents: number,
    stock: number,
    category: string,
    description: string,
    image_url:string
  ) {
  const insert = db.prepare(`
    INSERT INTO products (
      product_name,
      price_cents,
      stock,
      category,
      description,
      image_url
    ) VALUES (?, ?, ?, ?, ?, ?)
  `);

  insert.run(
    productName,
    price_cents,
    stock,
    category,
    description,
    image_url
  );
}

export const addToCart = db.transaction(
  (user_id: number, product_id: number, quantity: number = 1) => {
  let cart = db.prepare(`
    SELECT id FROM carts WHERE user_id = ?
  `).get(user_id) as { id: number } | undefined;

  if (!cart) {
    const result = db.prepare(`
      INSERT INTO carts (
        user_id
      ) VALUES (?)
    `).run(user_id);

    cart = { id: Number(result.lastInsertRowid)};
  }

  const cartItem = db.prepare(`
    SELECT id, quantity FROM cart_items WHERE cart_id = ? AND product_id = ?
  `).get(cart.id, product_id) as { id: number; quantity: number} | undefined;

  const stock = getStock(product_id);

  if (stock === undefined) {
    return { error: 'Product not found' };
  }

  if (stock < 1) {
    return { error: 'Product is out of stock' };
  }

  if (cartItem) {
    if (cartItem.quantity + quantity > stock) {
      return { error: 'Not enough stock' };
    }

    handleQuantity(user_id, product_id, quantity);
  } else {
    if (quantity > stock) {
      return { error: 'Not enough stock' };
    }

    db.prepare(`
      INSERT INTO cart_items (
        cart_id,
        product_id,
        quantity
      ) VALUES (?, ?, ?)
    `).run(cart.id, product_id, quantity);
  }

  return null;
});

type OrderProduct = {
  id: number,
  quantity: number
}

export const addToOrders = db.transaction(
  (user_id: number, products: OrderProduct[]) => {
  const result = db.prepare(`
    INSERT INTO orders (
      user_id,
      created_at 
    ) VALUES (?, ?)
  `).run(
    user_id,
    String(dayjs().format('YYYY-MM-DD HH:mm:ss'))
  );

  const orderId = Number(result.lastInsertRowid);

  const insertItem = db.prepare(`
    INSERT INTO order_items (
      order_id,
      product_id,
      quantity,
      price_cents
    ) VALUES (?, ?, ?, ?)
  `);

  const productItem = db.prepare(`
    UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?
  `);

  products.forEach(product => {

    const result = productItem.run(
      product.quantity,
      product.id,
      product.quantity
    );
    
    if (result.changes === 0) {
      throw new Error('Not enough stock');
    }
    
    const productData = db.prepare(`
      SELECT price_cents, stock
      FROM products
      WHERE id = ?
    `).get(product.id) as { price_cents: number; stock: number } | undefined;

    if (!productData) {
      throw new Error('Product not found');
    }

    insertItem.run(
      orderId,
      product.id,
      product.quantity,
      productData.price_cents
    );
  });
});

export function getProductCount() {
  const productsCount = db.prepare(`
    SELECT COUNT(*) AS count FROM products
  `).get() as { count: number };

  return productsCount.count;
}

export function getLastPage(limit: number) {
  if (limit <= 0) {
    throw new Error('limit must be greater than 0');
  }

  const productsCount = db.prepare(`
    SELECT COUNT(*) AS count FROM products
  `).get() as { count: number};

  const totalPages = Math.ceil(productsCount.count / limit);

  return totalPages;
}

export function getProducts(page: number = 1, limit: number = 20) {
  const offset = (page - 1) * limit;

  const products = db.prepare(`
    SELECT * FROM products ORDER BY id LIMIT ? OFFSET ?
  `).all(limit, offset);

  return products;
}

export function getUsers() {
  const users = db.prepare(`
    SELECT
      users.id,
      users.username,
      users.email,
      users.phone_number,
      users.country,
      users.city,
      users.birthday,
      users.created_at,
      users.is_active,
      COALESCE(SUM(order_items.quantity), 0) AS totalQuantity,
      COALESCE(SUM(order_items.price_cents * order_items.quantity), 0) AS totalSpent
    FROM users
    LEFT JOIN orders ON users.id = orders.user_id
    LEFT JOIN order_items ON orders.id = order_items.order_id
    GROUP BY users.id
    ORDER BY users.id DESC
  `).all();

  return users;
}

type OrdersType = {
  orderId: number;
  priceCents: number;
  status: string;
  date: string;
  username: string;
};

export function getOrders() {
  const orders = db.prepare(`
    SELECT
      orders.id AS orderId,
      SUM(order_items.price_cents * order_items.quantity) AS priceCents,
      orders.status,
      orders.created_at AS date,
      users.username
    FROM orders
    JOIN users ON orders.user_id = users.id
    JOIN order_items ON orders.id = order_items.order_id
    GROUP BY orders.id
    ORDER BY orders.id DESC
  `).all() as OrdersType[];

  return orders;
}

export async function login(emailOrUsername: string, password: string) {
  const user = db.prepare(`
    SELECT
      id,
      email,
      username,
      password_hash,
      role
    FROM users WHERE email = ? OR username = ?
  `).get(emailOrUsername, emailOrUsername) as { id: number; email: string; username: string; password_hash: string; role: string} | undefined;

  const errorMessage = 'Email or password is incorrect';

  if (!user) {
    return { error: errorMessage };
  }

  const passwordCorrect = await bcrypt.compare(password, user.password_hash);
  if (!passwordCorrect) {
    return { error: errorMessage };
  }

  return { user };
}

export function setSession(
    id: string,
    userId: number,
    expiresAt: string
  ) {
  const session = db.prepare(`
    INSERT INTO session (
      id,
      user_id,
      expire_at
    ) VALUES (?, ?, ?)
  `);

  session.run(id, userId, expiresAt);
}

export function getCurrentUserFromDB(sessionId: string) {
  const session = db.prepare(`
    SELECT
      users.id,
      users.username,
      users.email,
      users.role
    FROM session
    JOIN users ON session.user_id = users.id
    WHERE session.id = ? AND session.expire_at > ?
  `).get(sessionId, new Date().toISOString());

  return session ?? null;
}

export function deleteSessionFromDB(sessionId: string) {
  db.prepare(`
    DELETE FROM session WHERE id = ?
  `).run(sessionId);
}

export function handleUserActiveStatus(userId: number) {
  const user = db.prepare(`
    SELECT is_active FROM users WHERE id = ?
  `).get(userId) as { is_active: number } | undefined;

  if (!user) {
    throw new Error('User not found');
  }

  const newIsActive = user.is_active ? 0 : 1;
  
  db.prepare(`
    UPDATE users SET is_active = ? WHERE id = ?
  `).run(newIsActive, userId);
}

export function migrateToDB() {
  db.exec(`
    ALTER TABLE order_items
    ADD COLUMN delivery_option INTEGER NOT NULL DEFAULT 0 CHECK (delivery_option IN (0, 1, 2));
  `);
}

export function deleteFromDB() {
  db.exec(`
    ALTER TABLE orders
    DROP COLUMN delivery_option;
  `);
}

export function getUser(userId: number) {
  const user = db.prepare(`
    SELECT
      users.username,
      users.email,
      users.created_at,
      COALESCE(SUM(order_items.quantity), 0) AS totalQuantity,
      COALESCE(SUM(order_items.price_cents * order_items.quantity), 0) AS totalSpent,
      orders.id AS ordersId
    FROM users
    LEFT JOIN orders ON orders.user_id = users.id
    LEFT JOIN order_items ON order_items.order_id = orders.id
    WHERE users.id = ?
    GROUP BY users.id
    ORDER BY users.id DESC
  `).get(userId);

  return user;
}

export function getRecentOrders(numberOfOrders: number = 10,page: number = 1, offset: number = 0) {
  if (numberOfOrders < 0) {
    throw new Error('Number of orders must be more than 0');
  } else if (page < 1) {
    throw new Error('Page must be more than 0');
  } else if (offset < 0) {
    throw new Error('Offset must be more than 0');
  }

  if (page > 1) {
    offset = 1;
  }
  
  const recentOrders = db.prepare(`
    SELECT
      order_items.id,
      users.username,
      order_items.price_cents,
      orders.status,
      orders.created_at
    FROM orders
    JOIN users ON orders.user_id = users.id
    JOIN order_items ON order_items.order_id = orders.id
    ORDER BY orders.id DESC
    LIMIT ?
  `).all(numberOfOrders);

  return recentOrders;
}

export function getRecentOrder(userId: number, numberOfOrders: number = 10) {
  const recentOrders = db.prepare(`
    SELECT
      order_items.id,
      order_items.price_cents,
      orders.status
    FROM orders
    JOIN order_items ON order_items.order_id = orders.id
    WHERE orders.user_id = ?
    ORDER BY orders.id DESC
    LIMIT ?
  `).all(userId, numberOfOrders);

  return recentOrders;
}

export function getOrdersCount() {
  const orders = db.prepare(`
    SELECT COUNT(*) AS count FROM order_items
  `).get() as { count: number };

  return orders.count;
}

export function handleStock(productId: number, quantity: number) {
  db.prepare(`
    UPDATE products
    SET stock = stock - ?
    WHERE id = ?
  `).run(quantity, productId);
}

export function getStock(productId: number) {
  const product = db.prepare(`
    SELECT stock FROM products WHERE id = ?
  `).get(productId) as { stock: number} | undefined;

  return product?.stock;
}

export function handleQuantity(userId: number, productId: number, quantity: number) { 
  db.prepare(`
   UPDATE cart_items
    SET quantity = quantity + ?
    WHERE product_id = ?
      AND cart_id IN (
        SELECT id
        FROM carts
        WHERE user_id = ?
      )
  `).run(quantity, productId, userId);
}

export function handleSetQuantity(userId: number, productId: number, quantity: number) { 
  db.prepare(`
   UPDATE cart_items
    SET quantity = ?
    WHERE product_id = ?
      AND cart_id IN (
        SELECT id
        FROM carts
        WHERE user_id = ?
      )
  `).run(quantity, productId, userId);
}

export function getQuantity(userId: number) {
  const userProduct = db.prepare(`
    SELECT
      SUM(cart_items.quantity) AS totalQuantity
    FROM cart_items
    JOIN carts ON carts.id = cart_items.cart_id
    JOIN users ON users.id = ?
    GROUP BY users.id
  `).get(userId) as { totalQuantity: number} | undefined;

  return userProduct?.totalQuantity;
}

export function getUserCart(userId: number) {
  const cartItems = db.prepare(`
    SELECT
      products.id AS productId,
      products.price_cents,
      products.image_url,
      products.product_name,
      cart_items.quantity,
      cart_items.delivery_option,
      carts.id AS cartId,
      cart_items.id AS cartItemId
    FROM products
    JOIN cart_items ON cart_items.product_id = products.id
    JOIN carts ON carts.id = cart_items.cart_id
    WHERE carts.user_id = ?
    ORDER BY cart_items.id DESC
  `).all(userId);

  return cartItems;
}

export function updateDeliveryOptionCartItems(
    deliveryOption: number,
    userId: number,
    productId: number
  ) {
  if (![0, 1, 2].includes(deliveryOption)) {
    throw new Error('Invalid delivery option');
  }
  db.prepare(`
    UPDATE cart_items
    SET delivery_option = ?
    WHERE product_id = ?
      AND cart_id IN (
        SELECT id
        FROM carts
        WHERE id = cart_items.cart_id
          AND user_id = ?
      )
  `).run(deliveryOption, productId, userId);
}

export function deleteCartItems(
    userId: number,
    cartId: number,
    productId: number
  ) {
  db.prepare(`
    DELETE FROM cart_items
    WHERE cart_id = ?
      AND product_id = ?
      AND cart_id IN (
        SELECT id
        FROM carts
        WHERE user_id = ?
      )
  `).run(cartId, productId, userId);

  const cartItem = db.prepare(`
    SELECT id
    FROM cart_items
    WHERE cart_id = ?
    LIMIT 1
  `).get(cartId);

  if (!cartItem) {
    db.prepare(`
      DELETE FROM carts
      WHERE id = ? AND user_id = ?
    `).run(cartId, userId);
  }
}

export function getTotalPriceCents(userId: number) {
  const user = db.prepare(`
    SELECT SUM(products.price_cents * cart_items.quantity) AS totalPriceCents
    FROM cart_items
    JOIN products ON products.id = cart_items.product_id
    JOIN carts ON carts.id = cart_items.cart_id
    WHERE carts.user_id = ?
  `).get(userId) as { totalPriceCents: number | null } | undefined;

  return user?.totalPriceCents ?? 0;
}

type CartItems = {
  productId: number,
  price_cents: number,
  image_url: string,
  product_name: string,
  quantity: number,
  delivery_option: number,
  cartId: number,
  cartItemsId: number
};

export const checkout = db.transaction((userId: number) => {
  if (!userId) {
    return { error: 'User ID not found.' };
  }
  
  const userCart = getUserCart(userId) as CartItems[] | undefined;

  if (!userCart || userCart.length === 0) {
    return { notFound: 'No cart have been found.' };
  }

  for (const cart of userCart) {
    const stock = getStock(cart.productId);

    if (stock === undefined) {
      return { error: 'Product not found.' };
    }

    if (stock < cart.quantity) {
      return {
        error: `Not enough stock for ${cart.product_name}.`,
      };
    }
  }

  const orders = db.prepare(`
    INSERT INTO orders (
      user_id,
      created_at
    ) VALUES (?, ?)
  `).run(userId, dayjs().format('D MMMM YYYY'));
  
  const orderId = orders.lastInsertRowid;
  
  const orderItems = db.prepare(`
    INSERT INTO order_items (
      order_id,
      product_id,
      quantity,
      price_cents,
      delivery_option
    ) VALUES (?, ?, ?, ?, ?)
  `);

  userCart.forEach((cart) => {
    orderItems.run(
      orderId,
      cart.productId,
      cart.quantity,
      cart.price_cents,
      cart.delivery_option
    );
    deleteCartItems(userId, cart.cartId, cart.productId);
    handleStock(cart.productId, cart.quantity);
  });

  return null;
});

export function getUserOrders(userId: number) {
  const orders = db.prepare(`
    SELECT
      id,
      status,
      created_at
    FROM orders
    WHERE user_id = ?
    ORDER BY id DESC
  `).all(userId);

  return orders;
}

export function getUserOrderItems(userId: number, orderId: number) {
  const orderItems = db.prepare(`
    SELECT
      order_items.id,
      order_items.product_id,
      order_items.quantity,
      order_items.delivery_option,
      products.product_name,
      products.image_url
    FROM order_items
    JOIN orders ON orders.id = order_items.order_id
    JOIN products ON products.id = order_items.product_id
    WHERE order_items.order_id = ?
      AND orders.user_id = ?
  `).all(orderId, userId);
  
  return orderItems;
}

export function getTotalOrderPriceCents(orderId: number) {
  const order = db.prepare(`
    SELECT
      SUM(price_cents * quantity) AS totalOrderAmount
    FROM order_items
    WHERE order_id = ?
  `).get(orderId) as { totalOrderAmount: number } | null;

  return order?.totalOrderAmount;
}

export function getRevenue() {
  const orders = db.prepare(`
    SELECT
      SUM(price_cents * quantity) AS revenue
    FROM order_items
  `).get() as { revenue: number } | null;

  return orders?.revenue;
}

export function searchProducts(productNameOrCategory: string) {
  const products = db.prepare(`
    SELECT
      id,
      product_name,
      price_cents,
      stock,
      category,
      description,
      image_url
    FROM products
    WHERE product_name LIKE ? OR category LIKE ?
  `).all(`%${productNameOrCategory}%`, `%${productNameOrCategory}%`);

  if (products === null || products === undefined) {
    return { error: 'Could not found the product.' };
  }

  return products;
}