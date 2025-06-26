import styles from './Button.module.css';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={clsx(styles.button, styles[variant], className)}
      {...props}
    >
      {children}
    </button>
  )
);
Button.displayName = 'Button';

export default Button;
