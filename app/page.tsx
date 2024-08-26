import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { dehydrate, hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function HomePage() {


  return (
    <>
        <Welcome />
    </>
  );
}
