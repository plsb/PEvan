import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { wedding } from './src/config/wedding';
export default defineConfig(({mode}) => {
 const env = loadEnv(mode, '.', '');
 const url = (env.SITE_URL || wedding.website.url).replace(/\/$/, '');
 return { base: env.BASE_PATH || '/', plugins: [react(), {name:'wedding-meta', transformIndexHtml(html:string) {return html.replaceAll('__SITE_URL__', url).replaceAll('__OG_IMAGE__', url ? `${url}/og-image.jpg` : `${env.BASE_PATH || '/'}og-image.jpg`);}}] };
});
