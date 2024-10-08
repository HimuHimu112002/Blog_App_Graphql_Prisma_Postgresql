export const typeDefs = `#graphql

type Query{
  me: User
  users: [User]
  posts: [Post]
  profile(userId: ID!): Profile
}
  type Mutation{
    signup(
      name: String!,
      email: String!,
      password: String!
      bio: String
    ): UserArgs


    signIn(
      email: String,
      password: String
    ): UserArgs

    post(title: String!,content: String!): PostPayload
    updatePost(postId: ID!, post:PostInput!): PostPayload
    deletePost(postId: ID!): PostPayload
    publishPost(postId: ID!): PostPayload
  }

  type UserArgs{
    userError: String
    token: String
  }
    type PostPayload{
    userError: String
    post: Post
  }
    input PostInput{
    title: String
    content: String
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User
    createdAt: String!
    published: Boolean!
  }
  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String!
    posts: [Post]
  }
  type Profile {
    id: ID!
    bio: String!
    createdAt: String
    user: User!
  }
`;
