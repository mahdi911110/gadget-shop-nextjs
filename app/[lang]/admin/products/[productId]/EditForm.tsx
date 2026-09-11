'use client';

import { useActionState, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
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

export default function EditForm({ product, lang }: { product: ProductType, lang: 'fa' | 'en' }) {
  const [state, formAction, isPending] = useActionState(
    saveAction.bind(
      null,
      product.id,
      lang
    ),
    null
  );
  const { t } = useTranslation();
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
    <main className={`${styles.main} ${lang === 'fa' ? styles['main-fa'] : ''}`}>
      <div className={styles['form-header']}>{t('admin.productEdit.editProduct')} {product.id}</div>
      <form className={styles.card} action={formAction}>
        <div className={styles["card-container"]}>
          <label className={styles["card-title"]}>{t('admin.productEdit.productName')}</label>
          <input
            className={styles["card-input"]}
            name="name"
            type="text"
            defaultValue={product.product_name}
            placeholder={t('admin.productEdit.productNamePlaceholder')}
            required
          />
        </div>
        <div className={styles["card-container"]}>
          <label className={styles["card-title"]}>{t('admin.products.price')}</label>
          <input
            className={styles["card-input"]}
            name="price"
            type="number"
            min="1"
            step="0.01"
            defaultValue={product.price_cents / 100}
            placeholder={t('admin.productEdit.pricePlaceholder')}
            required
          />
        </div>
        <div className={styles["card-container"]}>
          <label className={styles["card-title"]}>{t('admin.products.stock')}</label>
          <input
            className={styles["card-input"]}
            name="stock"
            type="number"
            min="0"
            defaultValue={product.stock}
            placeholder={t('admin.productEdit.stockPlaceholder')}
            required
          />
        </div>
        <div className={styles["card-container"]}>
          <label className={styles["card-title"]}>{t('admin.products.category')}</label>
          <input
            className={styles["card-input"]}
            name="category"
            type="text"
            defaultValue={product.category}
            placeholder={t('admin.productEdit.categoryPlaceholder')}
            required
          />
        </div>
        <div className={styles["card-container"]}>
          <label className={styles["card-title"]}>{t('admin.products.description')}</label>
          <textarea
            className={styles["card-description"]}
            name="description"
            defaultValue={product.description}
            placeholder={t('admin.productEdit.descriptionPlaceholder')}
            required
          ></textarea>
        </div>
        <div className={styles["card-container"]}>
          <label className={styles["card-title"]}>{t('admin.productEdit.productImage')}</label>
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
          <Link className={styles.back} href={`/${lang}/admin/products`}>
            {t('admin.productEdit.back')}
          </Link>
          <button className={styles["button-reset"]} type="reset">
            {t('admin.productEdit.reset')}
          </button>
          <button className={isPending ? `${styles["button-add"]} loading` : styles["button-add"]} type="submit" disabled={isPending}>
            {isPending ? t('cart.editForm.saving') : t('cart.editForm.save')}
          </button>
        </div>
      </form>
    </main>
  );
}