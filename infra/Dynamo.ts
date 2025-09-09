const projectsTable = new sst.aws.Dynamo('projects', {
    fields: {
        projectId: 'string'
    },
    primaryIndex: { hashKey: 'projectId'}
})

export { projectsTable }