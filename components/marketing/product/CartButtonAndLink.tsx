'use client';

import { useActionState, useEffect } from 'react';
import styles from './CartButtonAndLink.module.css';
import addtoCartAction from './addToCartAction';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

export default function CartButtonAndLink({ productId, productStock, lang }: { productId: number, productStock: number, lang: 'fa' | 'en' }) {
  const [state, formAction, isPending] = useActionState(addtoCartAction.bind(null, productId), null);
  const { t } = useTranslation();

  useEffect(() => {
    if (state) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <div className={styles['card-button-container']}>
      <Link href={`/${lang}/${productId}`} className={styles['card-link-show']}>{t('card.viewLink')}</Link>
      {productStock > 0 ?
        <form className={styles['error-container']} action={formAction}>
          <button
            className={styles['card-button-add']}
            type="submit"
            disabled={isPending}
          >
            {isPending ? t('card.addingToCart') : t('card.addToCart')}
          </button>
        </form>
      :
        <div className={styles['out-of-stock']}>{t('card.outOfStock')}</div>
      }
    </div>
  );
}