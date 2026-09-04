'use client';

import { redirect } from 'next/navigation';
import styles from './SearchComponent.module.css';

import { type ChangeEvent, type KeyboardEvent, useState } from 'react';

export default function SearchComponent() {
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
      redirect('/admin/orders');
    }
    redirect(`/admin/orders?search=${searchText}`);
  }

  return (
    <input
      className={styles["input-search"]}
      type="text"
      placeholder="Search orders..."
      onChange={handleSearchText}
      value={searchText}
      onKeyDown={handleSearchOnKeyDown}
    />
  );
}