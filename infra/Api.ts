import { addAuthRoute } from './Helpers/ApiHelpers'
import { projectsTable } from './Dynamo'

const Api = new sst.aws.ApiGatewayV2('api', {
    link: [projectsTable],
    domain: `api.${$app.stage}.alistairmikeross.com`
})

const authorizer = Api.addAuthorizer({
    name: 'Auth',
    jwt: {
       audiences: ['alistairmikeross-web'],
       issuer: 'https://auth.alistairmikeross.com',
    }
})

const authItem = {
  jwt: {
    authorizer: authorizer.id
  }
}

addAuthRoute(Api, { path: 'GET /v1/projects', handler: 'server/functions/src/projects/getProjects.handler' }, authItem)
