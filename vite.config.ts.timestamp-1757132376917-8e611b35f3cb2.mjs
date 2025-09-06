// vite.config.ts
import path from 'path';
import { TanStackRouterVite } from 'file:///D:/workspace/SuiFestCard/node_modules/.pnpm/@tanstack+router-vite-plugi_f6167127fd174fca8a2ec4203747027d/node_modules/@tanstack/router-vite-plugin/dist/esm/index.js';
import react from 'file:///D:/workspace/SuiFestCard/node_modules/.pnpm/@vitejs+plugin-react-swc@3._9476fa74ff253042f6297b02b0873272/node_modules/@vitejs/plugin-react-swc/index.mjs';
import svgrPlugin from 'file:///D:/workspace/SuiFestCard/node_modules/.pnpm/vite-plugin-svgr@4.2.0_roll_5ed8fc3b8f03084f0c1e4353c38c2f3d/node_modules/vite-plugin-svgr/dist/index.js';
import webfontDownload from 'file:///D:/workspace/SuiFestCard/node_modules/.pnpm/vite-plugin-webfont-dl@3.9._2f5bd75c78e3cb6d9bcb41019d8417b1/node_modules/vite-plugin-webfont-dl/dist/index.mjs';
import { defineConfig } from 'file:///D:/workspace/SuiFestCard/node_modules/.pnpm/vite@5.2.13_@types+node@20.14.2/node_modules/vite/dist/node/index.js';

var __vite_injected_original_dirname = 'D:\\workspace\\SuiFestCard';
var vite_config_default = defineConfig({
  plugins: [react(), TanStackRouterVite(), svgrPlugin(), webfontDownload()],
  resolve: {
    alias: {
      '@': path.resolve(__vite_injected_original_dirname, './src'),
    },
  },
  server: {
    port: 5173,
  },
  preview: {
    port: 8080,
  },
});
export { vite_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx3b3Jrc3BhY2VcXFxcU3VpRmVzdENhcmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHdvcmtzcGFjZVxcXFxTdWlGZXN0Q2FyZFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovd29ya3NwYWNlL1N1aUZlc3RDYXJkL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBUYW5TdGFja1JvdXRlclZpdGUgfSBmcm9tICdAdGFuc3RhY2svcm91dGVyLXZpdGUtcGx1Z2luJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2MnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgc3ZnclBsdWdpbiBmcm9tICd2aXRlLXBsdWdpbi1zdmdyJztcbmltcG9ydCB3ZWJmb250RG93bmxvYWQgZnJvbSAndml0ZS1wbHVnaW4td2ViZm9udC1kbCc7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKSwgVGFuU3RhY2tSb3V0ZXJWaXRlKCksIHN2Z3JQbHVnaW4oKSwgd2ViZm9udERvd25sb2FkKCldLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXG4gICAgfSxcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogNTE3MyxcbiAgfSxcbiAgcHJldmlldzoge1xuICAgIHBvcnQ6IDgwODAsXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBZ1EsT0FBTyxVQUFVO0FBQ2pSLFNBQVMsMEJBQTBCO0FBQ25DLE9BQU8sV0FBVztBQUNsQixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLHFCQUFxQjtBQUw1QixJQUFNLG1DQUFtQztBQVF6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxHQUFHLG1CQUFtQixHQUFHLFdBQVcsR0FBRyxnQkFBZ0IsQ0FBQztBQUFBLEVBQ3hFLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsRUFDUjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
