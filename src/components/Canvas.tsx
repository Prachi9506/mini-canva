
import React, { useRef, useEffect } from 'react';
import * as fabric from 'fabric';
import { createCanvas } from '../utils/canvasHelpers';

interface CanvasProps {
  onCanvasReady: (canvas: fabric.Canvas) => void;
}

const Canvas: React.FC<CanvasProps> = ({ onCanvasReady }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasInstanceRef = useRef<fabric.Canvas | null>(null);

  useEffect(() => {
    if (canvasRef.current && !canvasInstanceRef.current) {
      const canvas = createCanvas(canvasRef.current.id);
      canvasInstanceRef.current = canvas;
      onCanvasReady(canvas);

      // Add some default styling
      canvas.selection = true;
      canvas.preserveObjectStacking = true;

      // Handle window resize
      const handleResize = () => {
        const container = canvasRef.current?.parentElement;
        if (container && canvas) {
          const containerWidth = container.clientWidth - 40; // Account for padding
          const containerHeight = container.clientHeight - 40;
          const scale = Math.min(containerWidth / 800, containerHeight / 600);
          
          canvas.setZoom(scale);
          canvas.calcOffset();
        }
      };

      window.addEventListener('resize', handleResize);
      handleResize(); // Initial resize

      return () => {
        window.removeEventListener('resize', handleResize);
        canvas.dispose();
        canvasInstanceRef.current = null;
      };
    }
  }, [onCanvasReady]);

  return (
    <div className="flex-1 bg-gray-100 flex items-center justify-center p-5">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <canvas
          ref={canvasRef}
          id="poster-canvas"
          className="border border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
};

export default Canvas;
