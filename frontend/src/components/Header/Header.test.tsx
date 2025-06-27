import { render, screen } from '@testing-library/react';
import Header from './Header';
import { usePathname } from 'next/navigation';
import { fetchSanityData } from '@/lib/sanity.fetch';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));
jest.mock('@/lib/sanity.fetch');

describe('Header', () => {
  it('renders logo and navigation', () => {
    (usePathname as jest.Mock).mockReturnValue('/es');
    render(<Header locale="es" />);
    expect(screen.getByLabelText(/Edurne Ferrero Home/i)).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Coaching')).toBeInTheDocument();
  });

  it('shows language switcher', () => {
    (usePathname as jest.Mock).mockReturnValue('/es');
    render(<Header locale="es" />);
    expect(screen.getByLabelText(/Switch to English|Cambiar a Español/i)).toBeInTheDocument();
  });

  it('maps static pages correctly', async () => {
    (usePathname as jest.Mock).mockReturnValue('/es/sobre-mi');
    render(<Header locale="es" />);
    // Wait for async effect
    const switcher = await screen.findByRole('link', { name: /EN|Switch to English/i });
    expect(switcher).toHaveAttribute('href', '/en/about');
  });

  it('maps blog post to other locale if exists', async () => {
    (usePathname as jest.Mock).mockReturnValue('/es/blog/test-slug');
    // Mock fetchSanityData to return a post (exists)
    (fetchSanityData as jest.Mock).mockReturnValue({ slug: { current: 'test-slug' } });
    render(<Header locale="es" />);
    const switcher = await screen.findByRole('link', { name: /EN|Switch to English/i });
    expect(switcher).toHaveAttribute('href', '/en/blog/test-slug');
  });

  it('maps blog post to blog archive if not exists', async () => {
    (usePathname as jest.Mock).mockReturnValue('/es/blog/missing-slug');
    (fetchSanityData as jest.Mock).mockReturnValue(null);
    render(<Header locale="es" />);
    const switcher = await screen.findByRole('link', { name: /EN|Switch to English/i });
    expect(switcher).toHaveAttribute('href', '/en/blog');
  });
});
