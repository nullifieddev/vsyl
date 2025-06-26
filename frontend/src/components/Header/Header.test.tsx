import { render, screen } from '@testing-library/react';
import Header from './Header';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('Header', () => {
  it('renders logo and navigation', () => {
    (usePathname as jest.Mock).mockReturnValue('/es');
    render(<Header />);
    expect(screen.getByLabelText(/Edurne Ferrero Home/i)).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Coaching')).toBeInTheDocument();
  });

  it('shows language switcher', () => {
    (usePathname as jest.Mock).mockReturnValue('/es');
    render(<Header />);
    expect(screen.getByLabelText(/Switch to English|Cambiar a Español/i)).toBeInTheDocument();
  });
});
