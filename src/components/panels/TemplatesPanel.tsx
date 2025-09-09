import React from 'react';
import * as fabric from 'fabric';
import { setCanvasBackground } from '../../utils/canvasHelpers';
import { posterTemplates } from '../../data/templates';

interface TemplatesPanelProps {
  canvas: fabric.Canvas | null;
}

const TemplatesPanel: React.FC<TemplatesPanelProps> = ({ canvas }) => {
  const applyTemplate = (template: any) => {
    if (!canvas) return;

    // Clear canvas
    canvas.clear();
    
    // Set background
    if (template.background.type === 'gradient') {
      setCanvasBackground(canvas, 'gradient', template.background.value);
    } else {
      setCanvasBackground(canvas, 'color', template.background.value);
    }

    // Add template elements (placeholder text and shapes)
    const titleText = new fabric.IText('Your Title Here', {
      left: canvas.width! / 2 - 100,
      top: 50,
      fontSize: 36,
      fontWeight: 'bold',
      fill: '#ffffff',
      textAlign: 'center',
      editable: true,
    });

    const subtitleText = new fabric.IText('Subtitle or description', {
      left: canvas.width! / 2 - 80,
      top: 100,
      fontSize: 18,
      fill: '#ffffff',
      textAlign: 'center',
      editable: true,
    });

    canvas.add(titleText, subtitleText);
    canvas.renderAll();
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Templates</h3>
      
      <div className="space-y-4">
        {posterTemplates.map((template) => (
          <div key={template.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="aspect-video bg-gray-100 relative overflow-hidden">
              <img
                src={template.thumbnail}
                alt={template.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <button
                  onClick={() => applyTemplate(template)}
                  className="px-4 py-2 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Use Template
                </button>
              </div>
            </div>
            <div className="p-3">
              <h4 className="font-medium text-gray-900">{template.name}</h4>
              <p className="text-sm text-gray-500">{template.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplatesPanel;