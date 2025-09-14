import { PosterTemplate } from '../types';

export const posterTemplates: PosterTemplate[] = [
  {
    id: 'event-1', 
    name: 'Music Event',
    category: 'Events',
    thumbnail: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300',
    background: { type: 'gradient', value: ['#667eea', '#764ba2'] },
    elements: [],
  },
  {
    id: 'birthday-1',
    name: 'Birthday Party',
    category: 'Birthday',
    thumbnail: 'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=300',
    background: { type: 'gradient', value: ['#ffecd2', '#fcb69f'] },
    elements: [],
  },
  {
    id: 'sale-1',
    name: 'Sale Flyer',
    category: 'Business',
    thumbnail: 'https://images.pexels.com/photos/5632371/pexels-photo-5632371.jpeg?auto=compress&cs=tinysrgb&w=300',
    background: { type: 'gradient', value: ['#a8edea', '#fed6e3'] },
    elements: [],
  },
];

export const stickerCategories = [
  {
    name: 'Emojis',
    stickers: ['😀', '😂', '🥳', '😍', '🤔', '👍', '❤️', '🎉', '🔥', '⭐', '🌟', '💫'],
  },
  {
    name: 'Travel',
    stickers: ['✈️', '🗺️', '🧳', '📍', '🏖️', '🏔️', '🚗', '🚢', '🎒', '📷', '🌍', '🗽'],
  },
  {
    name: 'Study',
    stickers: ['📚', '✏️', '📝', '🎓', '🖊️', '📊', '💡', '🔬', '📐', '🖥️', '⌨️', '🖱️'],
  },
  {
    name: 'Sports',
    stickers: ['⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏓', '🏸', '🥊', '🏆', '🥇', '🎯'],
  },
];

export const fontOptions = [
  { family: 'Inter', name: 'Inter', weights: ['400', '500', '600', '700'] },
  { family: 'Roboto', name: 'Roboto', weights: ['400', '500', '700'] },
  { family: 'Open Sans', name: 'Open Sans', weights: ['400', '600', '700'] },
  { family: 'Poppins', name: 'Poppins', weights: ['400', '500', '600', '700'] },
  { family: 'Montserrat', name: 'Montserrat', weights: ['400', '500', '600', '700'] },
  { family: 'Playfair Display', name: 'Playfair Display', weights: ['400', '700'] },
];
