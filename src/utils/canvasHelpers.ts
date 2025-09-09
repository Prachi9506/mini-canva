import * as fabric from 'fabric';

export const createCanvas = (canvasId: string) => {
  const canvas = new fabric.Canvas(canvasId, {
    width: 800,
    height: 600,
    backgroundColor: '#ffffff',
  });
  
  return canvas;
};

export const addTextToCanvas = (canvas: fabric.Canvas, text: string = 'Double click to edit') => {
  const textObj = new fabric.IText(text, {
    left: 100,
    top: 100,
    fontFamily: 'Arial',
    fontSize: 24,
    fill: '#000000',
    editable: true,
  });
  
  canvas.add(textObj);
  canvas.setActiveObject(textObj);
  canvas.renderAll();
  return textObj;
};

export const addShapeToCanvas = (canvas: fabric.Canvas, shapeType: string) => {
  let shape;
  
  switch (shapeType) {
    case 'rectangle':
      shape = new fabric.Rect({
        left: 100,
        top: 100,
        width: 100,
        height: 60,
        fill: '#3B82F6',
      });
      break;
    case 'circle':
      shape = new fabric.Circle({
        left: 100,
        top: 100,
        radius: 50,
        fill: '#10B981',
      });
      break;
    case 'triangle':
      shape = new fabric.Triangle({
        left: 100,
        top: 100,
        width: 100,
        height: 100,
        fill: '#F59E0B',
      });
      break;
    case 'star':
      const starPoints = [
        { x: 50, y: 0 },
        { x: 61, y: 35 },
        { x: 98, y: 35 },
        { x: 68, y: 57 },
        { x: 79, y: 91 },
        { x: 50, y: 70 },
        { x: 21, y: 91 },
        { x: 32, y: 57 },
        { x: 2, y: 35 },
        { x: 39, y: 35 },
      ];
      shape = new fabric.Polygon(starPoints, {
        left: 100,
        top: 100,
        fill: '#EF4444',
      });
      break;
    default:
      return;
  }
  
  canvas.add(shape);
  canvas.setActiveObject(shape);
  canvas.renderAll();
  return shape;
};

export const addEmojiToCanvas = (canvas: fabric.Canvas, emoji: string) => {
  const emojiObj = new fabric.IText(emoji, {
    left: 100,
    top: 100,
    fontSize: 48,
    editable: false,
  });
  
  canvas.add(emojiObj);
  canvas.setActiveObject(emojiObj);
  canvas.renderAll();
  return emojiObj;
};

export const addImageToCanvas = (canvas: fabric.Canvas, imageUrl: string) => {
  return new Promise((resolve, reject) => {
    fabric.Image.fromURL(imageUrl, (img) => {
      if (img) {
        img.set({
          left: 100,
          top: 100,
          scaleX: 0.3,
          scaleY: 0.3,
        });
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
        resolve(img);
      } else {
        reject(new Error('Failed to load image'));
      }
    }, { crossOrigin: 'anonymous' });
  });
};

export const setCanvasBackground = (canvas: fabric.Canvas, type: string, value: any) => {
  switch (type) {
    case 'color':
      canvas.setBackgroundColor(value, canvas.renderAll.bind(canvas));
      break;
    case 'gradient':
      const gradient = new fabric.Gradient({
        type: 'linear',
        coords: { x1: 0, y1: 0, x2: canvas.width!, y2: canvas.height! },
        colorStops: [
          { offset: 0, color: value[0] },
          { offset: 1, color: value[1] },
        ],
      });
      canvas.setBackgroundColor(gradient, canvas.renderAll.bind(canvas));
      break;
    case 'image':
      fabric.Image.fromURL(value, (img) => {
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          scaleX: canvas.width! / img.width!,
          scaleY: canvas.height! / img.height!,
        });
      }, { crossOrigin: 'anonymous' });
      break;
  }
};

export const exportCanvas = (canvas: fabric.Canvas, format: string = 'png') => {
  const dataURL = canvas.toDataURL({
    format: format,
    quality: 1,
    multiplier: 2,
  });
  
  const link = document.createElement('a');
  link.download = `poster.${format}`;
  link.href = dataURL;
  link.click();
};

export const saveToLocalStorage = (canvas: fabric.Canvas, name: string) => {
  const canvasData = canvas.toJSON();
  localStorage.setItem(`poster_${name}`, JSON.stringify(canvasData));
};

export const loadFromLocalStorage = (canvas: fabric.Canvas, name: string) => {
  const canvasData = localStorage.getItem(`poster_${name}`);
  if (canvasData) {
    canvas.loadFromJSON(JSON.parse(canvasData), () => {
      canvas.renderAll();
    });
  }
};