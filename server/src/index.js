const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Link = require("./resolvers/Link");
const Subscription = require("./resolvers/Subscription");
const Vote = require("./resolvers/Vote");

const resolvers = {
    Query,
    Mutation,
    Subscription,
    User,
    Link,
    Vote
};

const server = new GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers,
    context: request => {
        return {
            ...request,
            prisma
        };
    }
});

async function main() {
    // Create a new link
    const newLink = await prisma.createLink({
        url: "www.prismas.io",
        description: "Prisma replaces traditional ORMss"
    });
    console.log(`Created new link: ${newLink.url} (ID: ${newLink.id})`);

    // Read all links from the database and print them to the console
    const allLinks = await prisma.links();
    console.log(allLinks);
}

main().catch(e => console.error(e));

server.start(() => console.log(`It's alive: http://localhost:4000`));
