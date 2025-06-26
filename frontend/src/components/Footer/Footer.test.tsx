import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('renders social links and copyright', () => {
    render(<Footer />);
    expect(screen.getByLabelText('Instagram')).toBeInTheDocument();
    expect(screen.getByLabelText('Facebook')).toBeInTheDocument();
    expect(screen.getByText(/Edurne Ferrero/)).toBeInTheDocument();
    expect(screen.getByText(/Unapologetic Sanctuary/)).toBeInTheDocument();
  });

  it('renders the Equinox symbol', () => {
    render(<Footer />);
    // The EquinoxSymbol SVG is decorative, so it should have aria-hidden="true" and not role="img".
    // Instead, query by aria-hidden or by class.
    const equinox = document.querySelector('svg.equinox');
    expect(equinox).toBeInTheDocument();
    expect(equinox).toHaveAttribute('aria-hidden', 'true');
  });
});
