import React, { useState, useCallback, useRef } from 'react';
import * as fabric from 'fabric';
import Sidebar from './components/Sidebar';
import PanelContent from './components/PanelContent';
import Canvas from './components/Canvas';
import { exportCanvas, saveToLocalStorage } from './utils/canvasHelpers';

function App() {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [activePanel, setActivePanel] = useState('text');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const undoStack = useRef<string[]>([]);
  const redoStack = useRef<string[]>([]);
  const isUndoRedo = useRef(false);

  const handleCanvasReady = useCallback((canvasInstance: fabric.Canvas) => {
    setCanvas(canvasInstance);
    
    // Save initial state
    const initialState = JSON.stringify(canvasInstance.toJSON());
    undoStack.current = [initialState];
    
    // Listen for changes to save history
    const saveStateHandler = () => {
      if (!isUndoRedo.current) {
        saveState();
      }
    };
    
    canvasInstance.on('object:added', saveStateHandler);
    canvasInstance.on('object:removed', saveStateHandler);
    canvasInstance.on('object:modified', saveStateHandler);
    canvasInstance.on('path:created', saveStateHandler);
  }, []);

  const saveState = useCallback(() => {
    if (!canvas) return;
    
    const currentState = JSON.stringify(canvas.toJSON());
    
    // Don't save duplicate states
    if (undoStack.current[undoStack.current.length - 1] === currentState) {
      return;
    }
    
    undoStack.current.push(currentState);
    
    // Limit undo stack size
    if (undoStack.current.length > 50) {
      undoStack.current.shift();
    }
    
    // Clear redo stack when new action is performed
    redoStack.current = [];
  }, [canvas]);

  const handleUndo = useCallback(() => {
    if (!canvas || undoStack.current.length <= 1) return;
    
    isUndoRedo.current = true;
    const currentState = undoStack.current.pop();
    if (currentState) {
      redoStack.current.push(currentState);
    }
    
    const previousState = undoStack.current[undoStack.current.length - 1];
    if (previousState) {
      canvas.loadFromJSON(previousState, () => {
        canvas.renderAll();
        isUndoRedo.current = false;
      });
    } else {
      isUndoRedo.current = false;
    }
  }, [canvas]);

  const handleRedo = useCallback(() => {
    if (!canvas || redoStack.current.length === 0) return;
    
    isUndoRedo.current = true;
    const nextState = redoStack.current.pop();
    if (nextState) {
      undoStack.current.push(nextState);
      canvas.loadFromJSON(nextState, () => {
        canvas.renderAll();
        isUndoRedo.current = false;
      });
    } else {
      isUndoRedo.current = false;
    }
  }, [canvas]);

  const handleSave = useCallback(() => {
    if (!canvas) return;
    
    const name = prompt('Enter a name for your poster:');
    if (name) {
      saveToLocalStorage(canvas, name);
      alert('Poster saved successfully!');
    }
  }, [canvas]);

  const handleExport = useCallback(() => {
    if (!canvas) return;
    
    const format = confirm('Export as PNG? (Cancel for JPEG)') ? 'png' : 'jpeg';
    exportCanvas(canvas, format);
  }, [canvas]);

  return (
    <div className="h-screen flex bg-gray-50">
      <Sidebar
        activePanel={activePanel}
        setActivePanel={setActivePanel}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onSave={handleSave}
        onExport={handleExport}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      
      <PanelContent
        activePanel={activePanel}
        canvas={canvas}
        isCollapsed={isCollapsed}
      />
      
      <Canvas onCanvasReady={handleCanvasReady} />
    </div>
  );
}

export default App;