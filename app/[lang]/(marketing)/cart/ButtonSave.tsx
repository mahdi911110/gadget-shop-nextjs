'use client';

import { useActionState, useState, useEffect, useRef } from 'react';
import styles from './page.module.css';
import updateSaveButton from './updateSaveButton';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export default function ButtonSave({ lang, quantity, productId }: { lang: 'fa' | 'en', quantity: number, productId: number }) {
  const [state, formAction, isPending] = useActionState(updateSaveButton.bind(null, lang, productId), null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSave, setIsSave] = useState(false);
  const [prevState, setPrevState] = useState(isPending);
  const { t } = useTranslation();

  function handleIsSave() {
    setIsSave(prev => !prev);
  }

  if (isPending !== prevState) {
    setPrevState(isPending);
    if (state?.success) {
      setIsSave(false);
    }
  }

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  useEffect(() => {
    if (isSave) {
      inputRef.current?.select();
    }
  }, [isSave]);

  if (isSave) {
    return (
      <form action={formAction}>
        <input
          className={styles["input-edit"]}
          type="number"
          min={1}
          ref={inputRef}
          name='quantity'
          placeholder={t('cart.editForm.editInput')}
          defaultValue={quantity}
          required
        />{" "}
        <button 
          className={styles["button-add"]}
          disabled={isPending}
          type='submit'
        >
          {isPending ? t('cart.editForm.saving') : t('cart.editForm.save')}
        </button>
      </form>
    );
  } else {
    return (
      <>
        <div className={styles['quantity-text']}>
          {quantity}
        </div>
        <button className={styles['button-edit']} onClick={handleIsSave}>
          {t('cart.editForm.edit')}
        </button>
      </>
    );
  }
}