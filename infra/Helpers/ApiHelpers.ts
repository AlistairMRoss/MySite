interface AuthRouteProps extends sst.aws.ApiGatewayV2RouteArgs {
  path: string;
  handler: string;
}

function addAuthRoute(api: sst.aws.ApiGatewayV2, props: AuthRouteProps, authItem: { jwt: { authorizer: $util.Output<string> }}): void {
  api.route(props.path, props.handler, {
    auth: authItem,
    ...props
  })
}

export { addAuthRoute }
