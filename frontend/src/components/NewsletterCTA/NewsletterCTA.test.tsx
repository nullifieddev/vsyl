import { render, screen, fireEvent } from '@testing-library/react';
import NewsletterCTA from './NewsletterCTA';

describe('NewsletterCTA', () => {
  it('renders heading and form', () => {
    render(<NewsletterCTA />);
    expect(screen.getByRole('heading', { name: /recibe inspiración/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /suscribirme/i })).toBeInTheDocument();
  });

  it('shows error on invalid email', () => {
    render(<NewsletterCTA />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
    fireEvent.click(screen.getByRole('button', { name: /suscribirme/i }));
    expect(screen.getByRole('alert')).toHaveTextContent(/email válido/i);
  });

  it('shows success on valid submission', () => {
    render(<NewsletterCTA />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /suscribirme/i }));
    expect(screen.getByRole('status')).toHaveTextContent(/gracias/i);
  });
});
