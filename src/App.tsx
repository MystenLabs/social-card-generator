import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, type createRouter } from '@tanstack/react-router';

import Layout from './components/layout';
import { AuthProvider } from './context/AuthContext';

const queryClient = new QueryClient();

type AppProps = { router: ReturnType<typeof createRouter> };

const App = ({ router }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Layout>
          <RouterProvider router={router} />
        </Layout>
      </AuthProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};

export default App;
