interface AuthRouteProps extends sst.aws.ApiGatewayV2RouteArgs {
  path: string;
  handler: string;
}

function addAuthRoute(api: sst.aws.ApiGatewayV2, props: AuthRouteProps, authItem: { lambda: $util.Output<string> }): void {
  api.route(props.path, props.handler, {
    auth: authItem,
    ...props
  })
}

const auth = new sst.Linkable('authLinks', {
  properties: {
    MyAuth: 'https://auth.alistairmikeross.com',
    redirect: 'https://api.live.alistairmikeross.com/redirect'
    
  }
})

export { addAuthRoute, auth}
