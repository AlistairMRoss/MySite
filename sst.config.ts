/// <reference path='./.sst/platform/config.d.ts' />

export default $config({
  app(input) {
    return {
      name: 'mysite',
      removal: input?.stage === 'live' ? 'remove' : 'remove',
      protect: [''].includes(input?.stage),
      home: 'aws'
    };
  },
  async run() {
    await import('./infra/Dynamo')
    await import('./infra/Api')
    new sst.aws.StaticSite("web", {
      path: 'web',
      build: {
        command: "yarn install && yarn build",
        output: "dist"
      },
      domain: {
        name: "alistairmikeross.com",
        redirects: ["www.alistairmikeross.com"]
      }
    })
  },
});
