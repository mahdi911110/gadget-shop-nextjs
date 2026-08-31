import Database from 'better-sqlite3';
import bcrypt from 'bcrypt';
import dayjs from 'dayjs';
import { cookies } from 'next/headers';

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
  (user_id: number, product_id: number) => {
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
    SELECT id FROM cart_items WHERE cart_id = ? AND product_id = ?
  `).get(cart.id, product_id) as { id: number; quantity: number} | undefined;

  const product = db.prepare(`
    SELECT stock FROM products WHERE id = ?
  `).get(product_id) as { stock: number } | undefined;

  if (!product) {
    throw new Error('Product not found');
  }

  if (product.stock < 1) {
    throw new Error('Product is out of stock');
  }

  if (cartItem) {
    if (cartItem.quantity >= product.stock) {
      throw new Error('Not enough stock');
    }

    db.prepare(`
      UPDATE cart_items SET quantity = quantity + 1 WHERE id = ?
    `).run(cartItem.id);
  } else {
    db.prepare(`
      INSERT INTO cart_items (
        cart_id,
        product_id,
        quantity
      ) VALUES (?, ?, ?)
    `).run(cart.id, product_id, 1);
  }
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

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const sessionId = cookieStore.get('session')?.value;

  if (!sessionId) {
    return null;
  }

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

export function deleteUsersFromDB(userId: number) {
  db.prepare(`
    DELETE FROM users WHERE id = ?
  `).run(userId);
}