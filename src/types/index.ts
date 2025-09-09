export interface CanvasElement {
  id: string;
  type: 'text' | 'shape' | 'image' | 'emoji' | 'border';
  properties: {
    [key: string]: any;
  };
}

export interface PosterTemplate {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  elements: CanvasElement[];
  background: BackgroundConfig;
}

export interface BackgroundConfig {
  type: 'color' | 'gradient' | 'image' | 'pattern';
  value: string | string[];
}

export interface FontOption {
  family: string;
  name: string;
  weights: string[];
}

export interface ShapeOption {
  name: string;
  type: string;
  icon: string;
}

export interface StickerCategory {
  name: string;
  stickers: string[];
}