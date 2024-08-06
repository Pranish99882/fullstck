import { defineConfig } from 'vitest/config';


const CoverageModule = {
  getProvider: () => {
    throw 'called';
  },
};
export default defineConfig({
  
  test: {
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
    globals: true,
      coverage: {
        provider: CoverageModule,
        include: [
          'src/components/LoginForm.jsx',
          'src/components/RegistrationForm.jsx',
          'src/components/EditProfileForm.jsx',
          'src/components/UserListing.jsx'
        ],
      },

  },
});
