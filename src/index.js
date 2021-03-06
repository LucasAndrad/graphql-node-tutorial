const { GraphQLServer } = require('graphql-yoga')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: async (parent, args, context) => {
      return context.prisma.link.findMany()
    }
  },
  Mutation: {
    post: (parent, args, context, info) => {
      const newLink = context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description,
        }
      })
      return newLink
    }
  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    prisma,
  }
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
