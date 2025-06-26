import styles from './SampleButton.module.css';
import { FC, ButtonHTMLAttributes } from 'react';

interface SampleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const SampleButton: FC<SampleButtonProps> = ({ label, ...props }) => (
  <button className={styles.button} {...props}>
    {label}
  </button>
);

export default SampleButton;
