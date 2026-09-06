import Link from "next/link";
import styles from './Pagination.module.css';

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
          Previous
        </Link>
      )}

      <div className={styles['text-page']}>
        Page: {page} / {totalPages}
      </div>

      {page < totalPages && (
        <Link
          className={styles['link-page']}
          href={nextPageUrl}
        >
          Next
        </Link>
      )}
    </div>
  );
};