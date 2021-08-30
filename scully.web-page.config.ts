import { ScullyConfig } from '@scullyio/scully';

export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "web-page",
  outDir: './dist/static',
  routes: {},
  extraRoutes: [
    '/index',
    '/resume',
    '/skills',
    '/books',
    '/courses',
    '/projects',
    '/blog',
    '/contact',
    '/recruiters_headhunters']
};
