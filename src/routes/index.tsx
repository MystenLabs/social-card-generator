import Home from '@/pages/home';
import { createFileRoute } from '@tanstack/react-router';

import ProtectedRoute from '@/components/ProtectedRoute';

export const Route = createFileRoute('/')({
  component: () => (
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  ),
});
