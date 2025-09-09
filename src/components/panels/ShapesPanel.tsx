import React from 'react';
import * as fabric from 'fabric';
import { addShapeToCanvas } from '../../utils/canvasHelpers';
import { Square, Circle, Triangle, Star } from 'lucide-react';

interface ShapesPanelProps {
  canvas: fabric.Canvas | null;
}

const ShapesPanel: React.FC<ShapesPanelProps> = ({ canvas }) => {
  const shapes = [
    { type: 'rectangle', name: 'Rectangle', icon: Square },
    { type: 'circle', name: 'Circle', icon: Circle },
    { type: 'triangle', name: 'Triangle', icon: Triangle },
    { type: 'star', name: 'Star', icon: Star },
  ];

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Shapes</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {shapes.map((shape) => {
          const Icon = shape.icon;
          return (
            <button
              key={shape.type}
              onClick={() => canvas && addShapeToCanvas(canvas, shape.type)}
              className="flex flex-col items-center gap-2 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors"
            >
              <Icon size={24} className="text-gray-600" />
              <span className="text-sm font-medium text-gray-700">{shape.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ShapesPanel;