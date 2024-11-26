export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://855c-172-249-48-107.ngrok-free.app', // Use your ngrok URL here
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
