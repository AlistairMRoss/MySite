import { addAuthRoute } from './Helpers/ApiHelpers'
import { projectsTable, blogsTable, subscribersTable } from './Dynamo'

const webOrigin = $app.stage === 'live'
	? 'https://alistairmikeross.com'
	: `https://${$app.stage}.alistairmikeross.com`

const emailSender = 'noreply@notifications.alistairmikeross.com'

$transform(sst.aws.Function, (args) => {
	args.environment = {
		...((args.environment as Record<string, string>) ?? {}),
		EMAIL_SENDER: emailSender,
		WEB_ORIGIN: webOrigin,
	}
	args.permissions = [
		...((args.permissions as { actions: string[]; resources: string[] }[]) ?? []),
		{ actions: ['ses:SendEmail'], resources: ['*'] }
	]
})

export const Api = new sst.aws.ApiGatewayV2('api', {
	link: [projectsTable, blogsTable, subscribersTable],
	domain: `api.${$app.stage}.alistairmikeross.com`,
	cors: {
		allowOrigins: [webOrigin],
		allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
		allowHeaders: ['Content-Type', 'Authorization'],
		allowCredentials: true,
	},
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
addAuthRoute(Api, { path: 'PUT /v1/project/{projectId}', handler: 'server/functions/src/projects/updateProject.handler' }, authItem)
addAuthRoute(Api, { path: 'DELETE /v1/project/{projectId}', handler: 'server/functions/src/projects/deleteProject.handler' }, authItem)

Api.route('GET /v1/blogs', 'server/functions/src/blog/getBlogs.handler')
Api.route('GET /v1/blog/{blogId}', 'server/functions/src/blog/getBlog.handler')
addAuthRoute(Api, { path: 'POST /v1/blogs/add', handler: 'server/functions/src/blog/addBlog.handler' }, authItem)
addAuthRoute(Api, { path: 'DELETE /v1/blog/{blogId}', handler: 'server/functions/src/blog/deleteBlog.handler' }, authItem)

Api.route('POST /v1/subscribers', 'server/functions/src/subscribers/subscribe.handler')
Api.route('GET /v1/unsubscribe/{token}', 'server/functions/src/subscribers/unsubscribe.handler')
