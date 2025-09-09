import React, { useState, useEffect } from 'react';
import * as fabric from 'fabric';
import { Eye, EyeOff, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

interface LayersPanelProps {
  canvas: fabric.Canvas | null;
}

const LayersPanel: React.FC<LayersPanelProps> = ({ canvas }) => {
  const [objects, setObjects] = useState<fabric.Object[]>([]);

  useEffect(() => {
    if (!canvas) return;

    const updateObjects = () => {
      setObjects([...canvas.getObjects()]);
    };

    canvas.on('object:added', updateObjects);
    canvas.on('object:removed', updateObjects);
    canvas.on('object:modified', updateObjects);

    updateObjects();

    return () => {
      canvas.off('object:added', updateObjects);
      canvas.off('object:removed', updateObjects);
      canvas.off('object:modified', updateObjects);
    };
  }, [canvas]);

  const selectObject = (obj: fabric.Object) => {
    if (!canvas) return;
    canvas.setActiveObject(obj);
    canvas.renderAll();
  };

  const toggleVisibility = (obj: fabric.Object) => {
    if (!canvas) return;
    obj.visible = !obj.visible;
    canvas.renderAll();
    setObjects([...canvas.getObjects()]);
  };

  const deleteObject = (obj: fabric.Object) => {
    if (!canvas) return;
    canvas.remove(obj);
    canvas.renderAll();
  };

  const moveObject = (obj: fabric.Object, direction: 'up' | 'down') => {
    if (!canvas) return;
    
    if (direction === 'up') {
      canvas.bringForward(obj);
    } else {
      canvas.sendBackwards(obj);
    }
    canvas.renderAll();
    setObjects([...canvas.getObjects()]);
  };

  const getObjectLabel = (obj: fabric.Object) => {
    if (obj.type === 'text' || obj.type === 'i-text') {
      return `Text: ${(obj as fabric.IText).text?.slice(0, 20) || 'Text'}`;
    }
    return obj.type?.charAt(0).toUpperCase() + obj.type?.slice(1) || 'Object';
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Layers</h3>
      
      {objects.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No objects on canvas</p>
      ) : (
        <div className="space-y-2">
          {objects.map((obj, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <button
                onClick={() => selectObject(obj)}
                className="flex-1 text-left text-sm font-medium text-gray-700 truncate"
              >
                {getObjectLabel(obj)}
              </button>
              
              <div className="flex gap-1">
                <button
                  onClick={() => toggleVisibility(obj)}
                  className="p-1 text-gray-500 hover:text-gray-700"
                  title={obj.visible ? 'Hide' : 'Show'}
                >
                  {obj.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                
                <button
                  onClick={() => moveObject(obj, 'up')}
                  className="p-1 text-gray-500 hover:text-gray-700"
                  title="Bring Forward"
                >
                  <ArrowUp size={16} />
                </button>
                
                <button
                  onClick={() => moveObject(obj, 'down')}
                  className="p-1 text-gray-500 hover:text-gray-700"
                  title="Send Backward"
                >
                  <ArrowDown size={16} />
                </button>
                
                <button
                  onClick={() => deleteObject(obj)}
                  className="p-1 text-red-500 hover:text-red-700"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LayersPanel;