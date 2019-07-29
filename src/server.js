const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const gql = require('graphql-tag');
const { buildASTSchema } = require('graphql');

const POSTS = [
    {
        date: '2018-10-24 13:37:00',
        device: 'Samsung A7',
        IP: '169.120.0.1',
    },
    {
        date: '2019-07-24 13:37:00',
        device: 'Samsung A7',
        IP: '123.123.1.1',
    },
    {
        date: '2019-07-28 13:37:00',
        device: 'Samsung A7',
        IP: '123.123.1.0',
    },
    {
        date: '2019-07-23 13:37:00',
        device: 'Samsung A9',
    },
    {
        date: '2019-06-23 13:37:00',
        device: 'Iphone X',
    },
    {
        date: '2019-06-29 13:37:00',
        device: 'Oppo V9',
        IP: '169.120.0.1',
    },
    {
        date: '2019-07-22 13:37:00',
        device: 'Iphone XS Max',
    },
];

const schema = buildASTSchema(gql`
  type Query {
    posts: [Post]
    post(id: ID!): Post
  }

  type Post {
    id: ID
    date: String
    IP: String
  }
`);

const mapPost = (post, id) => post && ({ id, ...post });

const root = {
  posts: () => POSTS.map(mapPost),
  post: ({ id }) => mapPost(POSTS[id], id),
};

const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

const port = process.env.PORT || 4000
app.listen(port);
console.log(`Running a GraphQL API server at localhost:${port}/graphql`);