// Blog Archive main entry for /es/blog (redirects to first page, SSG)
import { redirect } from 'next/navigation';

export default function BlogArchiveRedirect() {
  redirect('/es/blog/page/1');
  return null;
}
