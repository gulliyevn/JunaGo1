import React from 'react';
import { useTheme } from '../../../utils/themeContext';
import styles from './Button.module.scss';

type ButtonOwnProps<E extends React.ElementType = React.ElementType> = {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  fullWidth?: boolean;
  as?: E;
};

type ButtonProps<E extends React.ElementType> = ButtonOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof ButtonOwnProps>;

export const Button = <E extends React.ElementType = 'button'>({
  children,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  fullWidth = false,
  className,
  disabled,
  as,
  ...props
}: ButtonProps<E>) => {
  const { theme } = useTheme();
  const Component = as || 'button';
  
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    isLoading && styles.loading,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component
      className={buttonClasses}
      disabled={disabled || isLoading}
      data-theme={theme}
      {...props}
    >
      {isLoading ? (
        <span className={styles.spinner} aria-hidden="true" />
      ) : (
        children
      )}
    </Component>
  );
}; 