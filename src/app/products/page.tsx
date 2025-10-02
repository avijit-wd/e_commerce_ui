import ProductList from "@/components/ProductList";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) {
  const { category } = await searchParams;
  return (
    <div>
      <ProductList category={category} params="products" />
    </div>
  );
}
