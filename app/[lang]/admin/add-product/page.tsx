'use client';

import styles from "./page.module.css";
import addProductAction from "./ActionProductForm";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function AddProductForm({ lang }: { lang: 'fa'| 'en' }) {
  const [state, formAction, isPending] = useActionState(addProductAction.bind(null, lang), null);
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
    if (state) {
      toast.error(state.error);
    }
  });
  
  return (
    <main className={`${styles.main} ${styles['main-fa']}`}>
      <form className={styles.card} action={formAction}>
        <div className={styles["card-container"]}>
          <label className={styles["card-title"]}>{t('admin.productEdit.productName')}</label>
          <input
            className={styles["card-input"]}
            name="name"
            type="text"
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
            defaultValue="1"
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
            placeholder={t('admin.productEdit.categoryPlaceholder')}
            required
          />
        </div>
        <div className={styles["card-container"]}>
          <label className={styles["card-title"]}>{t('admin.products.description')}</label>
          <textarea
            className={styles["card-description"]}
            name="description"
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
                src={preview ? preview : '/images/upload.svg'}
                alt={preview ? 'Preview' : 'Upload image'}
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
          <button className={styles["button-reset"]} type="reset">
            {t('admin.productEdit.reset')}
          </button>
          <button className={isPending ? `${styles["button-add"]} loading` : styles["button-add"]} type="submit" disabled={isPending}>
            {isPending ? t('admin.addProduct.adding') : t('admin.addProduct.add')}
          </button>
        </div>
      </form>
    </main>
  );
}
