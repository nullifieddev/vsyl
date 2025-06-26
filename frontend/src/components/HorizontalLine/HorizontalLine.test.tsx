import { render } from '@testing-library/react';
import HorizontalLine from './HorizontalLine';

describe('HorizontalLine', () => {
  it('renders SVG with correct role and aria-hidden', () => {
    const { container } = render(<HorizontalLine />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('role', 'presentation');
  });

  it('applies custom color and size', () => {
    const { container } = render(
      <HorizontalLine color="meta" width="200px" height="10px" />
    );
    const svg = container.querySelector('svg');
    expect(svg).toHaveStyle({ width: '200px', height: '10px' });
  });
});
