interface StoreData {
  storeName: string;
}

interface ProductData {
  productName: string;
  productPrice: number;
  productDescription?: string;
}

export function validateStoreData(data: StoreData): StoreData {
  const { storeName } = data;

  // Check if storeName is provided and is a non-empty string
  if (!storeName || typeof storeName !== 'string' || storeName.trim().length === 0) {
    throw new Error('Invalid store name: It should be a non-empty string.');
  }

  return { storeName: storeName.trim() };
}

export function validateProductData(data: ProductData): ProductData {
  const { productName, productPrice, productDescription } = data;

  // Check if productName is provided and is a non-empty string
  if (!productName || typeof productName !== 'string' || productName.trim().length === 0) {
    throw new Error('Invalid product name: It should be a non-empty string.');
  }

  // Check if productPrice is a number and greater than 0
  if (typeof productPrice !== 'number' || isNaN(productPrice) || productPrice <= 0) {
    throw new Error('Invalid product price: It should be a number greater than 0.');
  }

  // Check if productDescription, if provided, is a string
  if (productDescription && typeof productDescription !== 'string') {
    throw new Error('Invalid product description: It should be a string.');
  }

  return {
    productName: productName.trim(),
    productPrice,
    productDescription: productDescription ? productDescription.trim() : undefined,
  };
}
