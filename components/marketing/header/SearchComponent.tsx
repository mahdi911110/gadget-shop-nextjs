"use client";

import { useState, type ChangeEvent, type KeyboardEvent } from "react";

import styles from "./SearchComponent.module.css";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function SearchComponent({ lang }: { lang: 'fa' | 'en' }) {
  const [searchText, setSearchText] = useState("");

  const { t } = useTranslation();

  function handleSearchText(event: ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
  }

  function handleSearchButton() {
    if (searchText.trim() === "") {
      redirect(`/${lang}`);
    }

    redirect(`/${lang}/?search=${searchText.trim()}`);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleSearchButton();
    }
    if (event.key === 'Escape') {
      setSearchText('');
    }
  }

  return (
    <div className={styles["search-box"]}>
      <input
        className={`${styles["search-input"]} ${lang === 'fa' ? styles["search-input-fa"] : ''}`}
        type="text"
        name="search-input"
        value={searchText}
        onChange={handleSearchText}
        onKeyDown={handleKeyDown}
        placeholder={`${t('mainSearch.placeholder')}`}
      />

      <button
        className={`${styles["search-button"]} ${lang === 'fa' ? styles["search-button-fa"] : ''}`}
        type="button"
        onClick={handleSearchButton}
      >
        <Image
          className={styles["search-button-img"]}
          width={35}
          height={35}
          src="/icons/search.svg"
          alt="Search"
        />
      </button>
    </div>
  );
}