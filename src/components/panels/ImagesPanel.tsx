import React, { useRef } from 'react';
import * as fabric from 'fabric';
import { addImageToCanvas } from '../../utils/canvasHelpers';
import { Upload, Image } from 'lucide-react';

interface ImagesPanelProps {
  canvas: fabric.Canvas | null;
}

const ImagesPanel: React.FC<ImagesPanelProps> = ({ canvas }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !canvas) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      addImageToCanvas(canvas, imageUrl).catch(console.error);
    };
    reader.readAsDataURL(file);
  };

  const stockImages = [
    'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400',
  ];

  const addStockImage = (src: string) => {
    if (!canvas) return;
    addImageToCanvas(canvas, src).catch(console.error);
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Images</h3>
      
      {/* Upload Section */}
      <div className="mb-6">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Upload size={20} />
          Upload Image
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {/* Stock Images */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Stock Images</h4>
        <div className="grid grid-cols-2 gap-3">
          {stockImages.map((src, index) => (
            <button
              key={index}
              onClick={() => addStockImage(src)}
              className="aspect-square bg-gray-100 rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
            >
              <img
                src={src}
                alt={`Stock image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImagesPanel;