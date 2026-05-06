export interface Project {
    projectId?: string
    title: string
    description: string
    tech: string[]
    status: string
    link: string
    category: string[]
}

export interface Blog {
    blogId?: string
    title: string
    content: string
    createdAt?: string
}

export interface Subscriber {
    email: string
    subscribedAt?: string
    unsubscribeToken?: string
}