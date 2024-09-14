export async function uploadImage(file: File): Promise<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append('file', file);
  
    const response = await fetch('/api/upload-image', {
      method: 'POST',
      body: formData
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to upload image');
    }
  
    const result = await response.json();
    return { imageUrl: result.imageUrl }; // Adjust based on your API response
  }
  