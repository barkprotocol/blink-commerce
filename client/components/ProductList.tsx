// client/components/ProductList.tsx

import React, { useEffect, useState } from 'react';
import { getProducts } from '../actions/product';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/product');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>${product.price}</p>
          <p>{product.description}</p>
          {product.images.map((image: any) => (
            <img key={image.id} src={image.url} alt={product.name} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
