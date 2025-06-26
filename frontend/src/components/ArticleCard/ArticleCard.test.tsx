import { render, screen } from '@testing-library/react';
import ArticleCard from './ArticleCard';

describe('ArticleCard', () => {
  const props = {
    slug: 'test-article',
    title: 'Test Article',
    excerpt: 'This is a test excerpt.',
    category: { title: 'Mindfulness', color: '#C86A43' },
    author: 'Edurne Ferrero',
    date: '2025-06-26',
    imageUrl: '/test.jpg',
    imageAlt: 'Test image',
    locale: 'en' as const,
  };

  it('renders article content', () => {
    render(<ArticleCard {...props} />);
    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.excerpt)).toBeInTheDocument();
    expect(screen.getByText(props.category.title)).toBeInTheDocument();
    expect(screen.getByText(props.author)).toBeInTheDocument();
    expect(screen.getByText(props.date)).toBeInTheDocument();
  });

  it('renders image with alt text', () => {
    render(<ArticleCard {...props} />);
    expect(screen.getByAltText(props.imageAlt)).toBeInTheDocument();
  });
});
