import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'show-admin-link',
      configureServer(server) {
        server.httpServer.once('listening', () => {
          setTimeout(() => {
            console.log('\n  \x1b[32m➜\x1b[0m  \x1b[1mAdmin Portal\x1b[0m: \x1b[36mhttp://localhost:5173/admin-login\x1b[0m\n');
          }, 100);
        });
      }
    }
  ],
})
