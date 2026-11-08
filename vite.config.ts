import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', 'VITE_');
  const siteUrl = env.VITE_SITE_URL || 'https://crona.silestisl.chatgpt.site/';

  return {
    base: env.VITE_BASE_PATH || '/',
    plugins: [react(), {
      name: 'crona-social-image',
      transformIndexHtml: (html) => html.replace(
        '__CRONA_SOCIAL_IMAGE__',
        new URL('crona.png', siteUrl).href,
      ),
    }],
  };
});
