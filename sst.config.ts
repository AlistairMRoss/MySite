/// <reference path='./.sst/platform/config.d.ts' />

export default $config({
  app(input) {
    return {
      name: 'mysite',
      removal: input?.stage === 'live' ? 'remove' : 'remove',
      protect: ['live'].includes(input?.stage),
      home: 'aws'
      ,providers: {
        aws: {
          profile: 'my_site',
          region: 'af-south-1'
        }
      }
    };
  },
  async run() {
    const { Monitor } = await import("whatwentwrong");                                                                                                                                            
                                                            
    const alerts = new Monitor("Alerts", {                                                                                                                                                        
      email: "alistairmikeross@gmail.com",
    });   

    await import('./infra/Dynamo')
    const { Api } = await import('./infra/Api')

    alerts.watch([Api], {metric: 'both'})

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
