import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders children and is clickable', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const btn = screen.getByRole('button', { name: /click me/i });
    expect(btn).toBeInTheDocument();
    btn.click();
    expect(handleClick).toHaveBeenCalled();
  });

  it('applies variant classes', () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button', { name: /secondary/i })).toHaveClass('secondary');
  });
});
