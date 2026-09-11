'use client';

import { type KeyboardEvent, type ChangeEvent,useState } from "react";
import styles from "./SearchComponent.module.css";
import { redirect } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function SearchComponent({ lang }: { lang: 'fa' | 'en' }) {
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
      redirect(`/${lang}/admin/users`);
    }
    redirect(`/${lang}/admin/users?search=${searchText}`);
  }
  return (
    <input
      className={styles["input-search"]}
      type="text"
      value={searchText}
      onKeyDown={handleSearchOnKeyDown}
      onChange={handleSearchText}
      placeholder={t('admin.users.searchPlaceholder')}
    />
  );
}
