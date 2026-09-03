'use client';

import { type ChangeEvent, type KeyboardEvent, useState } from 'react';
import styles from './SearchProduct.module.css';
import { redirect } from 'next/navigation';

export default function SearchProduct() {
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
      return;
    }
    redirect(`/admin/products/search?q=${searchText}`);
  }

  return (
    <input
      className={styles["input-search"]}
      type="text"
      placeholder="Search products..."
      value={searchText}
      onChange={handleSearchText}
      onKeyDown={handleSearchOnKeyDown}
    />
  );
}
