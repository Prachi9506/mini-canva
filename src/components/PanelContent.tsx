import React from 'react';
import TextPanel from './panels/TextPanel';
import ShapesPanel from './panels/ShapesPanel';
import StickersPanel from './panels/StickersPanel';
import ImagesPanel from './panels/ImagesPanel';
import BackgroundPanel from './panels/BackgroundPanel';
import TemplatesPanel from './panels/TemplatesPanel';
import LayersPanel from './panels/LayersPanel';

interface PanelContentProps {
  activePanel: string;
  canvas: fabric.Canvas | null;
  isCollapsed: boolean;
}

const PanelContent: React.FC<PanelContentProps> = ({ activePanel, canvas, isCollapsed }) => {
  if (isCollapsed) return null;

  const renderPanel = () => {
    switch (activePanel) {
      case 'text':
        return <TextPanel canvas={canvas} />;
      case 'shapes':
        return <ShapesPanel canvas={canvas} />;
      case 'stickers':
        return <StickersPanel canvas={canvas} />;
      case 'images':
        return <ImagesPanel canvas={canvas} />;
      case 'background':
        return <BackgroundPanel canvas={canvas} />;
      case 'templates':
        return <TemplatesPanel canvas={canvas} />;
      case 'layers':
        return <LayersPanel canvas={canvas} />;
      default:
        return <div className="p-4 text-center text-gray-500">Select a tool to get started</div>;
    }
  };

  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 overflow-y-auto">
      {renderPanel()}
    </div>
  );
};

export default PanelContent;