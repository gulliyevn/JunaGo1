import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../components/common/Button/Button';

describe('Button Component', () => {
  it('renders button with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Button variant="primary">Button</Button>);
    expect(screen.getByText('Button')).toHaveClass('primary');

    rerender(<Button variant="secondary">Button</Button>);
    expect(screen.getByText('Button')).toHaveClass('secondary');

    rerender(<Button variant="outline">Button</Button>);
    expect(screen.getByText('Button')).toHaveClass('outline');
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<Button size="small">Button</Button>);
    expect(screen.getByText('Button')).toHaveClass('small');

    rerender(<Button size="medium">Button</Button>);
    expect(screen.getByText('Button')).toHaveClass('medium');

    rerender(<Button size="large">Button</Button>);
    expect(screen.getByText('Button')).toHaveClass('large');
  });

  it('shows loading spinner when isLoading is true', () => {
    render(<Button isLoading>Button</Button>);
    expect(screen.getByText('Button')).toHaveClass('loading');
    expect(screen.getByText('Button').querySelector('.spinner')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Button</Button>);
    expect(screen.getByText('Button')).toBeDisabled();
  });

  it('is disabled when isLoading is true', () => {
    render(<Button isLoading>Button</Button>);
    expect(screen.getByText('Button')).toBeDisabled();
  });

  it('applies fullWidth class when fullWidth prop is true', () => {
    render(<Button fullWidth>Button</Button>);
    expect(screen.getByText('Button')).toHaveClass('fullWidth');
  });
}); 