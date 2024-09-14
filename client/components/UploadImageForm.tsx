import React, { useState } from 'react';

const UploadImageForm = ({ productId }: { productId: string }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    formData.append('productId', productId);

    try {
      const response = await fetch('/api/uploadImage', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        alert('Image uploaded successfully');
      } else {
        alert('Failed to upload image');
      }
    } catch (error) {
      alert('Error uploading image');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleChange} />
      <button type="submit">Upload Image</button>
    </form>
  );
};

export default UploadImageForm;
