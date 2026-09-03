"use client";

import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";

import styles from "./SearchComponent.module.css";
import Image from "next/image";

export default function SearchComponent() {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  function handleSearchText(event: ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
  }

  function handleSearchButton() {
    if (searchText.trim() === "") {
      router.push("/");
      return;
    }

    router.push(`/search?q=${searchText.trim()}`);
    setSearchText("");
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
        className={styles["search-input"]}
        type="text"
        name="search-input"
        value={searchText}
        onChange={handleSearchText}
        onKeyDown={handleKeyDown}
        placeholder="Search a product or a category"
      />

      <button
        className={styles["search-button"]}
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