import { db } from '@/db';
import { products } from '@/db/schema';

export const dynamic = 'force-dynamic';

async function getProducts() {
  return await db.select().from(products);
}

export default async function Home() {
  const productList = await getProducts();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productList.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <div className="mt-4">
              <p className="font-bold">${product.price.toString()}</p>
              <p className="text-sm text-gray-500">In stock: {product.stock}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
