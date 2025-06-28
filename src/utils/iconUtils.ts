
/**
 * Utility functions for handling icon display and sizing
 */

/**
 * Gets the appropriate CSS classes for displaying icons in advice cards
 * Ensures consistent sizing for all icon types (SVG, PNG, etc.)
 */
export const getAdviceIconClasses = (): string => {
  return "w-16 h-16 object-contain rounded-full border border-gray-200 bg-gray-50 p-2";
};

/**
 * Gets the container classes for the advice icon wrapper
 */
export const getAdviceIconContainerClasses = (): string => {
  return "flex-shrink-0 flex justify-center md:justify-start";
};

/**
 * Determines if an image URL is an SVG based on the file extension
 */
export const isSvgIcon = (url: string): boolean => {
  return url.toLowerCase().endsWith('.svg');
};

/**
 * Gets appropriate styling for different icon types
 */
export const getIconStyles = (imageUrl: string): React.CSSProperties => {
  if (isSvgIcon(imageUrl)) {
    return {
      width: '100%',
      height: '100%',
      objectFit: 'contain' as const
    };
  }
  
  return {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const
  };
};
