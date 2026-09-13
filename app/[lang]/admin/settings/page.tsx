import DarkButton from './darkButton';
import LanguageButton from './languageButton';
import styles from './page.module.css';

export default async function SettingsPage({
  params
}: {
  params: Promise<{ lang: 'fa' | 'en' }>
}) {
  const { lang } = await params;
  return (
    <main className={`${styles.main} ${lang === 'fa' ? styles['main-fa'] : ''}`}>
      <DarkButton />
      <LanguageButton lang={lang} />
    </main>
  );
}