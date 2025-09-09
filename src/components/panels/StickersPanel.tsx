import React, { useState } from 'react';
import * as fabric from 'fabric';
import { addEmojiToCanvas } from '../../utils/canvasHelpers';
import { stickerCategories } from '../../data/templates';

interface StickersPanelProps {
  canvas: fabric.Canvas | null;
}

const StickersPanel: React.FC<StickersPanelProps> = ({ canvas }) => {
  const [activeCategory, setActiveCategory] = useState(stickerCategories[0].name);

  const currentStickers = stickerCategories.find(cat => cat.name === activeCategory)?.stickers || [];

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Stickers & Emojis</h3>
      
      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-4">
        {stickerCategories.map((category) => (
          <button
            key={category.name}
            onClick={() => setActiveCategory(category.name)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category.name
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Stickers Grid */}
      <div className="grid grid-cols-4 gap-2">
        {currentStickers.map((sticker, index) => (
          <button
            key={index}
            onClick={() => canvas && addEmojiToCanvas(canvas, sticker)}
            className="aspect-square flex items-center justify-center text-2xl bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {sticker}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StickersPanel;