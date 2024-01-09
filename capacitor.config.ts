import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.feedback',
  appName: 'Feedback',
  webDir: 'www',
  server: {
    androidScheme: 'https',
  },
};

export default config;
