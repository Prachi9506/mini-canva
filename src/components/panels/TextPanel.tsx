import React, { useState, useEffect } from 'react';
import * as fabric from 'fabric';
import { addTextToCanvas } from '../../utils/canvasHelpers';
import { fontOptions } from '../../data/templates';
import { Plus, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface TextPanelProps {
  canvas: fabric.Canvas | null;
}

const TextPanel: React.FC<TextPanelProps> = ({ canvas }) => {
  const [selectedObject, setSelectedObject] = useState<fabric.Text | null>(null);
  const [textProperties, setTextProperties] = useState({
    fontFamily: 'Arial',
    fontSize: 24,
    fill: '#000000',
    fontWeight: 'normal',
    fontStyle: 'normal',
    underline: false,
    textAlign: 'left',
  });

  useEffect(() => {
    if (!canvas) return;

    const handleSelection = () => {
      const activeObject = canvas.getActiveObject();
      if (activeObject && (activeObject.type === 'text' || activeObject.type === 'i-text')) {
        const textObj = activeObject as fabric.IText;
        setSelectedObject(textObj);
        setTextProperties({
          fontFamily: textObj.fontFamily || 'Arial',
          fontSize: textObj.fontSize || 24,
          fill: textObj.fill as string || '#000000',
          fontWeight: textObj.fontWeight as string || 'normal',
          fontStyle: textObj.fontStyle || 'normal',
          underline: textObj.underline || false,
          textAlign: textObj.textAlign || 'left',
        });
      } else {
        setSelectedObject(null);
      }
    };

    canvas.on('selection:created', handleSelection);
    canvas.on('selection:updated', handleSelection);
    canvas.on('selection:cleared', () => setSelectedObject(null));

    return () => {
      canvas.off('selection:created', handleSelection);
      canvas.off('selection:updated', handleSelection);
      canvas.off('selection:cleared');
    };
  }, [canvas]);

  const updateTextProperty = (property: string, value: any) => {
    if (!canvas || !selectedObject) return;

    selectedObject.set(property, value);
    canvas.renderAll();
    setTextProperties(prev => ({ ...prev, [property]: value }));
  };

  const toggleProperty = (property: string) => {
    if (!canvas || !selectedObject) return;

    const currentValue = selectedObject.get(property);
    const newValue = property === 'fontWeight' 
      ? (currentValue === 'bold' ? 'normal' : 'bold')
      : property === 'fontStyle'
      ? (currentValue === 'italic' ? 'normal' : 'italic')
      : !currentValue;

    updateTextProperty(property, newValue);
  };

  return (
    <div className="p-4 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Text Tools</h3>
        
        <button
          onClick={() => canvas && addTextToCanvas(canvas)}
          className="w-full flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Add Text
        </button>
      </div>

      {selectedObject && (
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Text Properties</h4>
          
          {/* Font Family */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Font</label>
            <select
              value={textProperties.fontFamily}
              onChange={(e) => updateTextProperty('fontFamily', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              {fontOptions.map((font) => (
                <option key={font.family} value={font.family}>
                  {font.name}
                </option>
              ))}
            </select>
          </div>

          {/* Font Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
            <input
              type="range"
              min="8"
              max="120"
              value={textProperties.fontSize}
              onChange={(e) => updateTextProperty('fontSize', parseInt(e.target.value))}
              className="w-full"
            />
            <span className="text-sm text-gray-500">{textProperties.fontSize}px</span>
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
            <input
              type="color"
              value={textProperties.fill}
              onChange={(e) => updateTextProperty('fill', e.target.value)}
              className="w-full h-10 rounded-md border border-gray-300"
            />
          </div>

          {/* Text Style */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
            <div className="flex gap-2">
              <button
                onClick={() => toggleProperty('fontWeight')}
                className={`p-2 rounded-md border ${
                  textProperties.fontWeight === 'bold' 
                    ? 'bg-blue-100 border-blue-300' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Bold size={16} />
              </button>
              <button
                onClick={() => toggleProperty('fontStyle')}
                className={`p-2 rounded-md border ${
                  textProperties.fontStyle === 'italic' 
                    ? 'bg-blue-100 border-blue-300' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Italic size={16} />
              </button>
              <button
                onClick={() => toggleProperty('underline')}
                className={`p-2 rounded-md border ${
                  textProperties.underline 
                    ? 'bg-blue-100 border-blue-300' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Underline size={16} />
              </button>
            </div>
          </div>

          {/* Alignment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Alignment</label>
            <div className="flex gap-2">
              {['left', 'center', 'right'].map((align) => {
                const Icon = align === 'left' ? AlignLeft : align === 'center' ? AlignCenter : AlignRight;
                return (
                  <button
                    key={align}
                    onClick={() => updateTextProperty('textAlign', align)}
                    className={`p-2 rounded-md border ${
                      textProperties.textAlign === align 
                        ? 'bg-blue-100 border-blue-300' 
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={16} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextPanel;