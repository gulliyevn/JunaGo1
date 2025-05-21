import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

const colorPalettes = {
  // Modern color palettes
  blue: ['#2E8BC0', '#145DA0', '#0C2D48', '#B1D4E0'],
  green: ['#2D6A4F', '#40916C', '#52B788', '#D8F3DC'],
  purple: ['#7209B7', '#560BAD', '#480CA8', '#F5E6FA'],
  orange: ['#FB8500', '#FFB703', '#FD9E02', '#FFF1D0'],
  gray: ['#343A40', '#495057', '#6C757D', '#F8F9FA'],
  // Theme-specific palettes
  dark: ['#121212', '#1E1E1E', '#2C2C2C', '#3A3A3A'],
  light: ['#F8F9FA', '#E9ECEF', '#DEE2E6', '#CED4DA'],
};

/**
 * Component to generate placeholder images with customizable patterns and colors
 */
const PlaceholderImage = ({
  width = 300,
  height = 200,
  text = '',
  colorScheme = 'blue',
  pattern = 'gradient',
  className = '',
  style = {},
  fontSize = 24,
  fontColor = '#FFFFFF',
  showInitials = false,
}) => {
  // Select colors based on color scheme
  const colors = useMemo(() => {
    return colorPalettes[colorScheme] || colorPalettes.blue;
  }, [colorScheme]);
  
  // Generate a linear gradient background
  const gradientBackground = useMemo(() => {
    return `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`;
  }, [colors]);
  
  // Generate a striped pattern background
  const stripedBackground = useMemo(() => {
    return `repeating-linear-gradient(45deg, ${colors[0]}, ${colors[0]} 10px, ${colors[1]} 10px, ${colors[1]} 20px)`;
  }, [colors]);
  
  // Generate a dotted pattern background
  const dottedBackground = useMemo(() => {
    return `radial-gradient(${colors[1]} 3px, ${colors[0]} 3px)`;
  }, [colors]);
  
  // Calculate display text (either provided text or initials)
  const displayText = useMemo(() => {
    if (!showInitials) return text;
    return text
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  }, [text, showInitials]);

  // Select pattern based on the pattern prop
  const backgroundPattern = useMemo(() => {
    switch (pattern) {
      case 'striped':
        return stripedBackground;
      case 'dotted':
        return dottedBackground;
      case 'solid':
        return colors[0];
      default:
        return gradientBackground;
    }
  }, [pattern, stripedBackground, dottedBackground, gradientBackground, colors]);
  
  const containerStyle = {
    width,
    height,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: backgroundPattern,
    backgroundSize: pattern === 'dotted' ? '20px 20px' : 'cover',
    color: fontColor,
    fontSize: `${fontSize}px`,
    fontWeight: 'bold',
    overflow: 'hidden',
    borderRadius: '4px',
    ...style,
  };

  return (
    <div className={className} style={containerStyle} role="img" aria-label={text || 'Placeholder image'}>
      {displayText}
    </div>
  );
};

PlaceholderImage.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  text: PropTypes.string,
  colorScheme: PropTypes.oneOf(['blue', 'green', 'purple', 'orange', 'gray', 'dark', 'light']),
  pattern: PropTypes.oneOf(['gradient', 'striped', 'dotted', 'solid']),
  className: PropTypes.string,
  style: PropTypes.object,
  fontSize: PropTypes.number,
  fontColor: PropTypes.string,
  showInitials: PropTypes.bool,
};

export default PlaceholderImage; 