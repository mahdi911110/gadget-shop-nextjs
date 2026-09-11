'use client';

import { type ChangeEvent, type KeyboardEvent, useState } from 'react';
import styles from './SearchProduct.module.css';
import { redirect } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export default function SearchProduct({ lang }: { lang: 'fa' | 'en' }) {
  const [searchText, setSearchText] = useState('');
  const { t } = useTranslation();

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
      redirect(`/${lang}/admin/products`);
    }
    redirect(`/${lang}/admin/products?search=${searchText}`);
  }

  return (
    <input
      className={styles["input-search"]}
      type="text"
      placeholder={t('admin.products.searchPlaceholder')}
      value={searchText}
      onChange={handleSearchText}
      onKeyDown={handleSearchOnKeyDown}
    />
  );
}
