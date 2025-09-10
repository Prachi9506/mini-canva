import React, { useState } from 'react';
import { 
  Type, 
  Square, 
  Smile, 
  Image, 
  Palette, 
  Layout,
  Layers,
  Download,
  Save,
  RotateCcw,
  RotateCw,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  activePanel: string;
  setActivePanel: (panel: string) => void;
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
  onExport: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activePanel,
  setActivePanel,
  onUndo,
  onRedo,
  onSave,
  onExport,
  isCollapsed,
  setIsCollapsed,
}) => {
  const menuItems = [
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'shapes', icon: Square, label: 'Shapes' },
    { id: 'stickers', icon: Smile, label: 'Stickers' },
    // { id: 'images', icon: Image, label: 'Images' }, 
    // { id: 'background', icon: Palette, label: 'Background' },
    // { id: 'templates', icon: Layout, label: 'Templates' },
    { id: 'layers', icon: Layers, label: 'Layers' },
  ];

  const actionItems = [
    // { id: 'undo', icon: RotateCcw, label: 'Undo', action: onUndo },
    // { id: 'redo', icon: RotateCw, label: 'Redo', action: onRedo },
    { id: 'save', icon: Save, label: 'Save', action: onSave },
    { id: 'export', icon: Download, label: 'Export', action: onExport },
  ];

  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold text-gray-800">Poster Maker</h2>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 py-4">
          <div className="space-y-1 px-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePanel(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    activePanel === item.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon size={20} />
                  {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Items */}
        <div className="border-t border-gray-200 p-2">
          <div className="grid grid-cols-2 gap-1">
            {actionItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  title={item.label}
                >
                  <Icon size={18} />
                  {!isCollapsed && <span className="text-xs text-gray-600">{item.label}</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;