import Logout from '@/pages/logout';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/logout')({
  component: Logout,
});
