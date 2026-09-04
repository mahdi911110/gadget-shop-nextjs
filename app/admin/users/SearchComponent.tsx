'use client';

import { type KeyboardEvent, type ChangeEvent,useState } from "react";
import styles from "./SearchComponent.module.css";
import { redirect } from "next/navigation";

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
      redirect('/admin/users');
    }
    redirect(`/admin/users?search=${searchText}`);
  }
  return (
    <input
      className={styles["input-search"]}
      type="text"
      value={searchText}
      onKeyDown={handleSearchOnKeyDown}
      onChange={handleSearchText}
      placeholder="Search users..."
    />
  );
}
