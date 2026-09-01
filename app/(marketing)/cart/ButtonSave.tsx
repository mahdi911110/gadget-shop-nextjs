'use client';

import { useActionState, useState, useEffect } from 'react';
import styles from './page.module.css';
import updateSaveButton from './updateSaveButton';
import { toast } from 'react-toastify';

export default function ButtonSave({ quantity, productId }: { quantity: number, productId: number }) {
  const [state, formAction, isPending] = useActionState(updateSaveButton.bind(null, productId), null);
  const [isSave, setIsSave] = useState(false);
  function handleIsSave() {
    setIsSave(prev => !prev);
  }

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  if (isSave) {
    return (
      <form action={formAction}>
        <input
          className={styles["input-edit"]}
          type="number"
          min={1}
          name='quantity'
          placeholder={`${quantity}`}
        />{" "}
        <button 
          className={styles["button-add"]}
          disabled={isPending}
          type='submit'
        >
          {isPending ? 'Save...' : 'Save'}
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
          Edit
        </button>
      </>
    );
  }
}