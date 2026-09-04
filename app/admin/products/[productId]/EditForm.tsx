'use client';

import { useActionState, useEffect, useRef, useState } from "react";
import styles from "./EditForm.module.css";

import saveAction from "./saveAction";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";

type ProductType = {
  id: number,
  product_name: string,
  price_cents: number,
  stock: number,
  category: string,
  description: string,
  image_url: string
}

export default function EditForm({ product }: { product: ProductType }) {
  const [state, formAction, isPending] = useActionState(
    saveAction.bind(
      null,
      product.id
    ),
    null
  );

  const inputFileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  function handleImageChange() {
    const file = inputFileRef.current?.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  }

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <main className={styles.main}>
      <div className={styles['form-header']}>Edit Product With ID: {product.id}</div>
      <form className={styles.card} action={formAction}>
        <div className={styles["card-container"]}>
          <label className={styles["card-title"]}>Product Name</label>
          <input
            className={styles["card-input"]}
            name="name"
            type="text"
            defaultValue={product.product_name}
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
            min="1"
            step="0.01"
            defaultValue={product.price_cents / 100}
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
            defaultValue={product.stock}
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
            defaultValue={product.category}
            placeholder="Category name"
            required
          />
        </div>
        <div className={styles["card-container"]}>
          <label className={styles["card-title"]}>Description</label>
          <textarea
            className={styles["card-description"]}
            name="description"
            defaultValue={product.description}
            placeholder="Write a description for product"
            required
          ></textarea>
        </div>
        <div className={styles["card-container"]}>
          <label className={styles["card-title"]}>Product Image</label>
          <div className={styles['button-upload-container']}>
            <button
              className={styles['button-upload-img']}
              type="button"
              onClick={() => inputFileRef.current?.click()}
            >
              <Image
                src={preview ? preview : product.image_url}
                alt={preview ? 'Preview' : product.product_name}
                width={100}
                height={100}
                />
            </button>
            <input
              className={styles["card-file-input"]}
              name="image"
              type="file"
              onChange={handleImageChange}
              ref={inputFileRef}
              accept="image/*"
            />
          </div>
        </div>
        <div className={styles["card-button-container"]}>
          <Link className={styles.back} href="/admin/products">
            Back
          </Link>
          <button className={styles["button-reset"]} type="reset">
            Reset
          </button>
          <button className={isPending ? `${styles["button-add"]} loading` : styles["button-add"]} type="submit" disabled={isPending}>
            {isPending ? 'Saveing...' : 'Save'}
          </button>
        </div>
      </form>
    </main>
  );
}