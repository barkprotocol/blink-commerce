import React, { useEffect, useState } from 'react';

const ProductImages = ({ productId }: { productId: string }) => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`/api/getProductImages?productId=${productId}`);
        const result = await response.json();

        if (result.success) {
          setImages(result.data.map((img: { url: string }) => img.url));
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [productId]);

  return (
    <div>
      {images.map((url, index) => (
        <img key={index} src={url} alt={`Product Image ${index + 1}`} />
      ))}
    </div>
  );
};

export default ProductImages;
