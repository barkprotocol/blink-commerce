import { validateStoreData } from '../validators/validators';
import { logError } from '../utils/logger';
import { createStoreInDatabase } from '../database/database';

interface CreateStoreResponse {
  success: boolean;
  message: string;
  storeId?: string;
}

// Helper function to generate a store ID from the store name
function generateStoreId(storeName: string): string {
  return storeName.toLowerCase().replace(/\s+/g, '-');
}

export async function createStore(formData: FormData): Promise<CreateStoreResponse> {
  try {
    const storeName = formData.get('storeName') as string;
    
    // Validate the store data
    if (!storeName) {
      throw new Error('Store name is required');
    }
    
    const { storeName: validatedStoreName } = validateStoreData({ storeName });
    const storeId = generateStoreId(validatedStoreName);
    
    // Create store in the database
    await createStoreInDatabase(storeId, validatedStoreName);

    return { success: true, message: 'Store created successfully', storeId };
  } catch (error) {
    // Log the error and return a failure response
    logError(error as Error);
    return { success: false, message: `Failed to create store: ${error.message}` };
  }
}
