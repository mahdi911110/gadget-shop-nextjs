import styles from './page.module.css';

import Link from 'next/link';

export default function Signup() {
  return (
    <main className={styles.main}>
      <form className={styles.container}>
        <div className={styles.title}>SIGN UP</div>
        <div className={styles['input-box']}>
          <div className={styles.box}>
            <div className={styles.text}>Email:</div>
            <input className={styles.input} type="email" placeholder="Email" />
          </div>
          <div className={styles.box}>
            <div className={styles.text}>Username:</div>
            <input className={styles.input} type="text" placeholder="Username" />
          </div>
        </div>
        <div className={styles['input-box']}>
          <div className={styles.box}>
            <div className={styles.text}>Phone number:</div>
            <input className={styles.input} type="text" placeholder="Phone number" />
          </div>
          <div className={styles.box}>
            <div className={styles.text}>Address:</div>
            <input className={styles.input} type="text" placeholder="Address" />
          </div>
        </div>
        <div className={styles['input-box']}>
          <div className={styles.box}>
            <div className={styles.text}>Country:</div>
            <input className={styles.input} type="text" placeholder="Country" />
          </div>
          <div className={styles.box}>
            <div className={styles.text}>City:</div>
            <input className={styles.input} type="text" placeholder="City" />
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.text}>Birthday:</div>
          <input className={styles.input} type="date" />
        </div>
        <div className={styles['input-box']}>
          <div className={styles.box}>
            <div className={styles.text}>Password:</div>
            <input className={styles.input} type="password" placeholder="Password" />
          </div>
          <div className={styles.box}>
            <div className={styles.text}>Type password again:</div>
            <input className={styles.input} type="password" placeholder="Type password again" />
          </div>
        </div>
        <div className={styles['check-box']}>
          <input className={styles.check} type="checkbox"/> Show password
        </div>
        <button className={styles.button}>Register</button>
        <div className={styles['under-input']}>
          {'Have Account? '}
          <Link className={styles.link} href="/login">
            Login
          </Link>
        </div>
      </form>
    </main>
  );
}