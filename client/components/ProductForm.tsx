"use client";

import React, { useState } from 'react';
import { useToast } from '../hooks/use-toasts';
import { listProduct } from '../actions/product';

const ProductForm: React.FC = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState<number | ''>('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setProductImage(file);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!productName.trim() || productPrice === '' || productPrice <= 0 || !productImage) {
      addToast('error', 'Please provide valid product details.');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('productPrice', productPrice.toString());
      formData.append('productDescription', productDescription);
      formData.append('productImage', productImage);

      const response = await listProduct(formData);
      if (response.success) {
        addToast('success', response.message || 'Product listed successfully.');
        // Clear form fields after successful submission
        setProductName('');
        setProductPrice('');
        setProductDescription('');
        setProductImage(null);
      } else {
        addToast('error', response.message || 'Failed to list product.');
      }
    } catch (error) {
      addToast('error', `Failed to list product: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
      <h2 className="text-lg font-semibold mb-4">List New Product</h2>
      <div className="mb-4">
        <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
          Product Name
        </label>
        <input
          type="text"
          id="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
          aria-required="true"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">
          Product Price (SOL)
        </label>
        <input
          type="number"
          id="productPrice"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value ? Number(e.target.value) : '')}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
          aria-required="true"
          min="0.01"
          step="0.01"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700">
          Product Description
        </label>
        <textarea
          id="productDescription"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          aria-describedby="descriptionHelp"
        />
        <p id="descriptionHelp" className="text-sm text-gray-500">
          Provide a detailed description of the product.
        </p>
      </div>
      <div className="mb-4">
        <label htmlFor="productImage" className="block text-sm font-medium text-gray-700">
          Product Image
        </label>
        <input
          type="file"
          id="productImage"
          onChange={handleImageChange}
          className="mt-1 block w-full"
          accept="image/*"
          required
        />
      </div>
      <button 
        type="submit" 
        className={`px-4 py-2 rounded ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-gray-900 text-white'}`}
        disabled={loading}
      >
        {loading ? 'Listing...' : 'List Product'}
      </button>
    </form>
  );
};

export default ProductForm;
