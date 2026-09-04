'use client';

import { useActionState, useState, useEffect, useRef } from 'react';
import styles from './page.module.css';
import updateSaveButton from './updateSaveButton';
import { toast } from 'react-toastify';

export default function ButtonSave({ quantity, productId }: { quantity: number, productId: number }) {
  const [state, formAction, isPending] = useActionState(updateSaveButton.bind(null, productId), null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSave, setIsSave] = useState(false);
  const [prevState, setPrevState] = useState(isPending);

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
          placeholder={'Enter quantity'}
          defaultValue={quantity}
          required
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