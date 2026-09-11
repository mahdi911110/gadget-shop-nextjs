import Link from "next/link";
import styles from './Pagination.module.css';
import Translation from "../translation/Translation";

type PaginationProps = {
  url: string;
  search?: string;
  page: number;
  totalPages: number;
};

export default function Pagination({ url, search = '', page, totalPages }: PaginationProps) {
  const previousPageUrl =
  search === ''
    ? `${url}?page=${page - 1}`
    : `${url}?search=${encodeURIComponent(search)}&page=${page - 1}`;

  const nextPageUrl =
    search === ''
      ? `${url}?page=${page + 1}`
      : `${url}?search=${encodeURIComponent(search)}&page=${page + 1}`;
  

  return (
    <div className={styles["page-container"]}>
      {page > 1 && (
        <Link
          className={styles['link-page']}
          href={previousPageUrl}
        >
          <Translation translationKey="pagination.buttonPrev" />
        </Link>
      )}

      <div className={styles['text-page']}>
        <Translation translationKey="pagination.pageText" />: {page} / {totalPages}
      </div>

      {page < totalPages && (
        <Link
          className={styles['link-page']}
          href={nextPageUrl}
        >
          <Translation translationKey="pagination.buttonNext" />
        </Link>
      )}
    </div>
  );
};