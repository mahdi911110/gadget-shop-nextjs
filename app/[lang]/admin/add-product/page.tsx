import AddProductForm from "./AddProductForm";

export default async function AddProductPage({
  params
}: {
  params: Promise<{ lang: 'fa' | 'en' }>
}) {
  const { lang } = await params;
  return (
    <AddProductForm lang={lang} />
  );
}