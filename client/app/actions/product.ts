import { validateProductData, validateStoreData } from '../validators/validators';
import { logError } from '../utils/logger';
import { listProductInDatabase } from '../database/database';
import { uploadImage } from '../actions/image';

interface ListProductResponse {
  success: boolean;
  message: string;
}

interface ProductFormData {
  productName: string;
  productPrice: number;
  productDescription?: string;
  productImage?: File;
  storeName: string;
}

export async function listProduct(formData: FormData): Promise<ListProductResponse> {
  try {
    const product: ProductFormData = {
      productName: formData.get('productName') as string,
      productPrice: parseFloat(formData.get('productPrice') as string),
      productDescription: formData.get('productDescription') as string,
      productImage: formData.get('productImage') as File,
      storeName: formData.get('storeName') as string
    };

    // Validate store and product data
    validateStoreData({ storeName: product.storeName });
    const validatedProductData = validateProductData({
      productName: product.productName,
      productPrice: product.productPrice,
      productDescription: product.productDescription || ''
    });

    let imageUrl: string | undefined;

    // Handle image upload if an image is provided
    if (product.productImage) {
      const imageResponse = await uploadImage(product.productImage);
      imageUrl = imageResponse.imageUrl; // Assume uploadImage returns an object with imageUrl property
    }

    // Save product data along with image URL if available
    await listProductInDatabase({
      ...validatedProductData,
      imageUrl,
      storeName: product.storeName
    });

    return { success: true, message: 'Product listed successfully' };
  } catch (error) {
    logError(error as Error);
    return { success: false, message: `Failed to list product: ${error instanceof Error ? error.message : 'Unknown error'}` };
  }
}
