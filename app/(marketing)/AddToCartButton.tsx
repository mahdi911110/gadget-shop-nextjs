'use client';

import { useActionState } from 'react';
import styles from './page.module.css';
import addtoCartAction from './addToCartAction';

export default function AddToCartButton({ productId }: { productId: number }) {
  const [state, formAction, isPending] = useActionState(addtoCartAction.bind(null, productId), null);
  return (
    <form className={styles['error-container']} action={formAction}>
      {state?.error && (
        <div className={styles.error}>{state.error}</div>
      )}

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