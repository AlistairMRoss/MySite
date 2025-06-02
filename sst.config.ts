/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'mysite',
      removal: input?.stage === 'live' ? 'retain' : 'remove',
      protect: ['live'].includes(input?.stage),
      home: 'aws'
    }
  },
  async run() {
    new sst.aws.SvelteKit('mySite')
  }
})
