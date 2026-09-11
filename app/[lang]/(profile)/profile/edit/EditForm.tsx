'use client';

import { useActionState, useEffect } from 'react';
import styles from './EditForm.module.css';
import updateEdit from './updateEdit';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

type UserSession = {
  username: string,
  email: string,
  phone_number: string,
  address: string,
  country: string,
  city: string,
  birthday: string
} | null;

export default function EditForm({ user, lang }: { user: UserSession, lang: 'fa' | 'en' }) {
  const [state, formAction, isPending] = useActionState(updateEdit.bind(null, lang), null);

  if (!user) {
    redirect(`/${lang}/login`);
  }

  useEffect(() => {
    if (state) {
      if (state.error) {
        toast.error(state.error);
      }
      if (state.phoneError) {
        toast.error(state.phoneError);
      }
    }
  }, [state]);

  const { t } = useTranslation();

  return (
    <form className={styles.container} action={formAction}>
      <div className={styles.title}>{t('editProfile.editProfileTitle')}</div>
      <div className={styles["input-box"]}>
        <div className={styles.box}>
          <div className={styles.text}>{t('auth.email')}</div>
          <input
            className={styles.input}
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            defaultValue={user.email}
            required
          />
        </div>
        <div className={styles.box}>
          <div className={styles.text}>{t('auth.username')}</div>
          <input
            className={styles.input}
            name="username"
            placeholder="Username"
            autoComplete="username"
            defaultValue={user.username}
            required
          />
        </div>
      </div>
      <div className={styles["input-box"]}>
        <div className={styles.box}>
          <div className={styles.text}>{t('auth.phoneNumber')}</div>
          <input
            className={styles.input}
            name="phoneNumber"
            placeholder="Phone number"
            autoComplete="phoneNumber"
            defaultValue={user.phone_number}
            required
          />
        </div>
        <div className={styles.box}>
          <div className={styles.text}>{t('auth.address')}</div>
          <input
            className={styles.input}
            name="address"
            placeholder="Address"
            autoComplete="address"
            defaultValue={user.address}
            required
          />
        </div>
      </div>
      <div className={styles["input-box"]}>
        <div className={styles.box}>
          <div className={styles.text}>{t('auth.country')}</div>
          <input
            className={styles.input}
            name="country"
            placeholder="Country"
            autoComplete="country"
            defaultValue={user.country}
            required
          />
        </div>
        <div className={styles.box}>
          <div className={styles.text}>{t('auth.city')}</div>
          <input
            className={styles.input}
            name="city"
            placeholder="City"
            autoComplete="city"
            defaultValue={user.city}
            required
          />
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.text}>{t('auth.birthday')}</div>
        <input
          className={styles.input}
          name="birthday"
          type="date"
          autoComplete="birthday"
          defaultValue={user.birthday}
          required
        />
      </div>
      <div className={styles['button-container']}>
        <Link href={`/${lang}/profile`} className={styles['button-back']}>{t('admin.productEdit.back')}</Link>
        <button
          className={styles['button-back']} type='reset'
        >
          {t('admin.productEdit.reset')}
        </button>
        <button
          className={`${styles['button-edit']} ${isPending ? styles.loading : ""}`}
          disabled={isPending}
        >
          {isPending ? t('cart.editForm.editing') : t('cart.editForm.edit')}
        </button>
      </div>
    </form>
  );
}