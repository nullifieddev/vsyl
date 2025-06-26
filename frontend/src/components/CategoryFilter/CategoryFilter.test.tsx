import { render, screen, fireEvent } from '@testing-library/react';
import CategoryFilter, { Category } from './CategoryFilter';

describe('CategoryFilter', () => {
  const categories: Category[] = [
    { id: '1', title: 'Mindfulness', color: '#C86A43' },
    { id: '2', title: 'Coaching', color: '#A1A19B' },
  ];

  it('renders all categories and Todas button', () => {
    render(
      <CategoryFilter categories={categories} selected={null} onSelect={() => {}} />
    );
    expect(screen.getByRole('button', { name: /todas/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /mindfulness/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /coaching/i })).toBeInTheDocument();
  });

  it('calls onSelect when a category is clicked', () => {
    const onSelect = jest.fn();
    render(
      <CategoryFilter categories={categories} selected={null} onSelect={onSelect} />
    );
    fireEvent.click(screen.getByRole('button', { name: /mindfulness/i }));
    expect(onSelect).toHaveBeenCalledWith('1');
  });
});
