// Blog Archive main entry for /en/blog (redirects to first page, SSG)
import { redirect } from 'next/navigation';

export default function BlogArchiveRedirect() {
  redirect('/en/blog/page/1');
  return null;
}
