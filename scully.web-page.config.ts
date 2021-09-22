import { ScullyConfig } from '@scullyio/scully';

export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "web-page",
  outDir: './dist/static',
  routes: {
    '/blogposts/:title': {
      type: 'contentFolder',
      title: {
        folder: "./markdown-blog"
      }
    },},
  extraRoutes: [
    '/index',
    '/resume',
    '/skills',
    '/books',
    '/courses',
    '/projects',
    '/blog',
    '/contact',
    '/recruiters_headhunters',
    '/blogposts'
  ]
};
