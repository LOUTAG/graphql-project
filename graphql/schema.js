const { buildSchema } = require('graphql');

module.exports=buildSchema(`
    type Post {
        _id: ID!
        title: String!
        content: String!
        imageUrl: String!
        creator: User!
        createdAt: String!
        updatedAt: String!
    }    

    type User{
        _id: ID!
        email: String!
        name: String!
        password: String
        status: String!
        posts: [Post]
    }

    input UserInputData{
        email: String!
        name: String!
        password: String!
    }


    input PostInputData {
        title: String!
        imageUrl: String!
        content: String!
        creator: String!
    }

    type AuthData {
        token: String!
        userID: String!
    }


    type PostData{
        posts: [Post!]!
        totalPosts: Int!
    }
    type allPostsData{
        posts: [Post!]!
        totalPosts: Int!
        pages: Int!
    }

    type RootQuery {
        login(email: String!, password: String!): AuthData!
        posts: PostData!
        allPosts(page: Int!): allPostsData!
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!

        createPost(postInput: PostInputData): Post!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)