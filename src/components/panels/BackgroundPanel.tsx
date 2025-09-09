import React, { useState } from 'react';
import * as fabric from 'fabric';
import { setCanvasBackground } from '../../utils/canvasHelpers';
import { Palette, Image, BadgeCent as Gradient } from 'lucide-react';

interface BackgroundPanelProps {
  canvas: fabric.Canvas | null;
}

const BackgroundPanel: React.FC<BackgroundPanelProps> = ({ canvas }) => {
  const [backgroundType, setBackgroundType] = useState<'color' | 'gradient' | 'image'>('color');

  const solidColors = [
    '#ffffff', '#f3f4f6', '#e5e7eb', '#d1d5db',
    '#ef4444', '#f97316', '#f59e0b', '#eab308',
    '#22c55e', '#10b981', '#06b6d4', '#0ea5e9',
    '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7',
    '#ec4899', '#f43f5e', '#000000', '#374151',
  ];

  const gradients = [
    ['#667eea', '#764ba2'],
    ['#f093fb', '#f5576c'],
    ['#4facfe', '#00f2fe'],
    ['#43e97b', '#38f9d7'],
    ['#fa709a', '#fee140'],
    ['#a8edea', '#fed6e3'],
    ['#ffecd2', '#fcb69f'],
    ['#ff9a9e', '#fecfef'],
  ];

  const patterns = [
    'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1054222/pexels-photo-1054222.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1576937/pexels-photo-1576937.jpeg?auto=compress&cs=tinysrgb&w=400',
  ];

  const setBackgroundColor = (color: string) => {
    if (!canvas) return;
    setCanvasBackground(canvas, 'color', color);
  };

  const setBackgroundGradient = (colors: string[]) => {
    if (!canvas) return;
    setCanvasBackground(canvas, 'gradient', colors);
  };

  const setBackgroundImage = (src: string) => {
    if (!canvas) return;
    setCanvasBackground(canvas, 'image', src);
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Background</h3>
      
      {/* Type Selector */}
      <div className="flex gap-2 mb-4">
        {[
          { type: 'color', label: 'Color', icon: Palette },
          { type: 'gradient', label: 'Gradient', icon: Gradient },
          { type: 'image', label: 'Image', icon: Image },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.type}
              onClick={() => setBackgroundType(item.type as any)}
              className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                backgroundType === item.type
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Icon size={16} />
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Content based on type */}
      {backgroundType === 'color' && (
        <div className="grid grid-cols-5 gap-2">
          {solidColors.map((color) => (
            <button
              key={color}
              onClick={() => setBackgroundColor(color)}
              className="aspect-square rounded-lg border-2 border-gray-200 hover:border-gray-400 transition-colors"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      )}

      {backgroundType === 'gradient' && (
        <div className="space-y-3">
          {gradients.map((gradient, index) => (
            <button
              key={index}
              onClick={() => setBackgroundGradient(gradient)}
              className="w-full h-12 rounded-lg border-2 border-gray-200 hover:border-gray-400 transition-colors"
              style={{
                background: `linear-gradient(45deg, ${gradient[0]}, ${gradient[1]})`,
              }}
            />
          ))}
        </div>
      )}

      {backgroundType === 'image' && (
        <div className="grid grid-cols-2 gap-3">
          {patterns.map((src, index) => (
            <button
              key={index}
              onClick={() => setBackgroundImage(src)}
              className="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-gray-400 transition-colors"
            >
              <img
                src={src}
                alt={`Pattern ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BackgroundPanel;