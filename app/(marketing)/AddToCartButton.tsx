'use client';

import { useActionState, useEffect } from 'react';
import styles from './page.module.css';
import addtoCartAction from './addToCartAction';
import { toast } from 'react-toastify';

export default function AddToCartButton({ productId }: { productId: number }) {
  const [state, formAction, isPending] = useActionState(addtoCartAction.bind(null, productId), null);
  
  useEffect(() => {
    if (state) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form className={styles['error-container']} action={formAction}>
      <button
        className={styles['card-button-add']}
        type="submit"
        disabled={isPending}
      >
        {isPending ? 'Adding to Cart...' : 'Add to Cart'}
      </button>
    </form>
  );
}