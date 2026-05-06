const projectsTable = new sst.aws.Dynamo('projects', {
    fields: {
        projectId: 'string'
    },
    primaryIndex: { hashKey: 'projectId'}
})

const blogsTable = new sst.aws.Dynamo('blogs', {
    fields: {
        blogId: 'string'
    },
    primaryIndex: { hashKey: 'blogId' }
})

const subscribersTable = new sst.aws.Dynamo('subscribers', {
    fields: {
        email: 'string',
        unsubscribeToken: 'string'
    },
    primaryIndex: { hashKey: 'email' },
    globalIndexes: {
        ByUnsubscribeToken: { hashKey: 'unsubscribeToken' }
    }
})

export { projectsTable, blogsTable, subscribersTable }