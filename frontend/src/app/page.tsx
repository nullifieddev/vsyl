import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirect to default locale (Spanish)
  redirect('/es');
  return null;
}
