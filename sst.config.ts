/// <reference path='./.sst/platform/config.d.ts' />

import { Monitor } from 'whatwentwrong';

export default $config({
  app(input) {
    return {
      name: 'mysite',
      removal: input?.stage === 'live' ? 'remove' : 'remove',
      protect: ['live'].includes(input?.stage),
      home: 'aws'
    };
  },
  async run() {
    const alerts = new Monitor("Alerts", { email: "you@example.com" });

    await import('./infra/Dynamo')
    const api = await import('./infra/Api')

    alerts.watch([api])

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
