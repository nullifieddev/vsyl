import styles from './CategoryFilter.module.css';
import clsx from 'clsx';

export interface Category {
  id: string;
  title: string;
  color?: string;
}

export interface CategoryFilterProps {
  categories: Category[];
  selected: string | null;
  onSelect?: (categoryId: string | null) => void;
  label?: string;
}

export default function CategoryFilter({
  categories,
  selected,
  onSelect,
  label = 'Filtrar por categoría',
}: CategoryFilterProps) {
  return (
    <nav className={styles.filterNav} aria-label={label}>
      <ul className={styles.list}>
        <li>
          <button
            type="button"
            className={clsx(styles.button, !selected && styles.active)}
            {...(onSelect ? { onClick: () => onSelect(null) } : {})}
            aria-pressed={!selected}
          >
            Todas
          </button>
        </li>
        {categories.map((cat) => (
          <li key={cat.id}>
            <button
              type="button"
              className={clsx(styles.button, selected === cat.id && styles.active)}
              style={{ borderColor: cat.color || 'var(--color-accent, #C86A43)' }}
              {...(onSelect ? { onClick: () => onSelect(cat.id) } : {})}
              aria-pressed={selected === cat.id}
            >
              <span className={styles.swatch} style={{ background: cat.color || 'var(--color-accent, #C86A43)' }} aria-hidden="true" />
              {cat.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
