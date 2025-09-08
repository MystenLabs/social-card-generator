import PreviewPage from '@/pages/preview';
import { createFileRoute } from '@tanstack/react-router';

import ProtectedRoute from '@/components/ProtectedRoute';

export const Route = createFileRoute('/preview')({
  component: () => (
    <ProtectedRoute>
      <PreviewPage />
    </ProtectedRoute>
  ),
});
