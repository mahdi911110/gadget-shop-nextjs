import styles from "./page.module.css";

export default function AddProduct() {
  return (
    <main className={styles.main}>
      <form className={styles.card}>
        <div className={styles["card-container"]}>
          <label className={styles["card-title"]}>Product Name</label>
          <input
            className={styles["card-input"]}
            name="name"
            type="text"
            placeholder="Product name"
            required
          />
        </div>
        <div className={styles["card-container"]}>
          <label className={styles["card-title"]}>Price</label>
          <input
            className={styles["card-input"]}
            name="price"
            type="number"
            min="0"
            step="0.01"
            placeholder="Price"
            required
          />
        </div>
        <div className={styles["card-container"]}>
          <label className={styles["card-title"]}>Stock</label>
          <input
            className={styles["card-input"]}
            name="stock"
            type="number"
            min="0"
            defaultValue="1"
            placeholder="Stock"
            required
          />
        </div>
        <div className={styles["card-container"]}>
          <label className={styles["card-title"]}>Category</label>
          <input
            className={styles["card-input"]}
            name="category"
            type="text"
            placeholder="Category name"
            required
          />
        </div>
        <div className={styles["card-container"]}>
          <label className={styles["card-title"]}>Description</label>
          <textarea
            className={styles["card-description"]}
            name="description"
            placeholder="Write a description for product"
            required
          ></textarea>
        </div>
        <div className={styles["card-container"]}>
          <label className={styles["card-title"]}>Product Image</label>
          <input
            className={styles["card-file-input"]}
            name="image"
            type="file"
            accept="image/*"
            required
          />
        </div>
        <div className={styles["card-button-container"]}>
          <button className={styles["button-reset"]} type="reset">
            Reset
          </button>
          <button className={styles["button-add"]} type="submit">
            Add
          </button>
        </div>
      </form>
    </main>
  );
}
