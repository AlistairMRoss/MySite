/// <reference path='./.sst/platform/config.d.ts' />

export default $config({
  app(input) {
    return {
      name: 'mysite',
      removal: input?.stage === 'live' ? 'retain' : 'remove',
      protect: ['live'].includes(input?.stage),
      home: 'aws',
      providers: input?.stage === "live" ? {
        aws: {
          profile: "my_site",
          region: "af-south-1", 
        }
      } : {}
    };
  },
  async run() {
    new sst.aws.StaticSite("web", {
      path: 'web',
      build: {
        command: "yarn build",
        output: "dist"
      },
      domain: {
        name: "alistairmikeross.com",
        redirects: ["www.alistairmikeross.com"]
      }
    })
  },
});
