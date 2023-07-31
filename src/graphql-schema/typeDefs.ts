export const typeDefs = `#graphql
  type Book {
    title: String
    author: String
    datePublished: String
    description: String
    pageCount: Int
    genre: String
    publisher: String
  }

  type User {
    _id: String
    name: String
    email: String
    password: String
    token: String
  }

  type Query {
    books(first: 2): [Book]!
    book(id: String!): Book
    users: [User]!
    user(id: String!): User 
    bookByUser(userId: String): Book
  }

  type Message {
    message: String
  }


  type Mutation {
    createBook(title: String!, author: String!, pageCount: Int!, genre: String!, publisher: String!, description: String, datePublished:String): Book
    updateBook(_id: String, title: String, author: String, datePublished: String, description: String, pageCount: Int, genre: String, publisher: String): Boolean
    deleteBook(_id:String): Message
    createUser(email: String!, name: String!, password: String!): User
    loginUser(email: String!, password: String!): User
    updateUser(_id: String, email: String, password: String, name: String): Boolean
    deleteUser(_id:String): Message
  }
`;

// type Mutation {
//   createBook(title: String!, author: String!, pageCount: Int!, genre: String!, publisher: String!, description: String, datePublished:String): Book
//   updateBook(_id: String, title: String, author: String, datePublished: String, description: String, pageCount: Int, genre: String, publisher: String): Boolean
//   deleteBook(_id:String): Message
//   createUser(email: String!, name: String!, password: String!): User
//   loginUser(email: String!, password: String!): User
//   updateUser(_id: String, email: String, password: String, name: String): Boolean
//   deleteUser(_id:String): Message
// }


