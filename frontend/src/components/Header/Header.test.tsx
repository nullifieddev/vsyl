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

  it('maps static pages correctly', async () => {
    (usePathname as jest.Mock).mockReturnValue('/es/sobre-mi');
    render(<Header />);
    // Wait for async effect
    const switcher = await screen.findByRole('link', { name: /EN|Switch to English/i });
    expect(switcher).toHaveAttribute('href', '/en/about');
  });

  it('maps blog post to other locale if exists', async () => {
    (usePathname as jest.Mock).mockReturnValue('/es/blog/test-slug');
    // Mock fetchSanity to return 1 (exists)
    jest.mock('@/lib/sanity', () => ({ fetchSanity: () => 1 }));
    render(<Header />);
    const switcher = await screen.findByRole('link', { name: /EN|Switch to English/i });
    expect(switcher).toHaveAttribute('href', '/en/blog/test-slug');
  });

  it('maps blog post to blog archive if not exists', async () => {
    (usePathname as jest.Mock).mockReturnValue('/es/blog/missing-slug');
    jest.mock('@/lib/sanity', () => ({ fetchSanity: () => 0 }));
    render(<Header />);
    const switcher = await screen.findByRole('link', { name: /EN|Switch to English/i });
    expect(switcher).toHaveAttribute('href', '/en/blog');
  });
});
