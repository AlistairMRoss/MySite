import { addAuthRoute } from './Helpers/ApiHelpers'
import { projectsTable } from './Dynamo'

const Api = new sst.aws.ApiGatewayV2('api', {
    link: [projectsTable],
    domain: `api.${$app.stage}.alistairmikeross.com`,
})

const authorizerFunction = new sst.aws.Function('AuthorizerFunction', {
  handler: 'infra/Helpers/authorizer.handler',
})

const authorizer = Api.addAuthorizer({
    name: 'Auth',
    lambda: {
      function: authorizerFunction.arn,
      response: 'iam'
    }
})

const authItem = {
  lambda: authorizer.id
}

Api.route('GET /v1/projects', 'server/functions/src/projects/getProjects.handler')
addAuthRoute(Api, { path: 'POST /v1/projects/add', handler: 'server/functions/src/projects/addProject.handler' }, authItem)
addAuthRoute(Api, { path: 'DELETE /v1/project', handler: 'server/functions/src/projects/deleteProject.handler' }, authItem)