'use client';

import { redirect } from 'next/navigation';
import styles from './SearchComponent.module.css';
import { useTranslation } from 'react-i18next';
import { type ChangeEvent, type KeyboardEvent, useState } from 'react';

export default function SearchComponent({ lang }: { lang: 'fa' | 'en' }) {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState('');
  function handleSearchText(event: ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
  }
  
  function handleSearchOnKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      search();
    }

    if (event.key === 'Escape') {
      setSearchText('');
    }
  }

  function search() {
    if (searchText.trim() === '') {
      redirect(`/${lang}/admin/orders`);
    }
    redirect(`/${lang}/admin/orders?search=${searchText}`);
  }

  return (
    <input
      className={styles["input-search"]}
      type="text"
      placeholder={t('admin.orders.searchPlaceholder')}
      onChange={handleSearchText}
      value={searchText}
      onKeyDown={handleSearchOnKeyDown}
    />
  );
}