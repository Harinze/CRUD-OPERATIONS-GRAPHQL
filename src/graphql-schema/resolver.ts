import {editBook,getBook,getBooks,getUserBook,addBook,removeBook,createBookInterface,editBookInterface} from "../graphql-mongoose/books-logic";
import {getAllUsers,getSingleUser,insertUser,logUserIn,editUser, userId, removeUser} from "../graphql-mongoose/users-logic";


export const resolvers = {
  Query: {
    async books(root:string, {}, {}) {
      const book = await getBooks();
      return book;
    },

    async book(_:unknown, { id}:{id:string}) {
      const book = await getBook(id);
      return book;
    },

    async users() {
      const users = await getAllUsers();
      return users;
    },

    async user(_:unknown, { id}:{id:string}){
      const user = await getSingleUser(id);
      return user;
    },

    async bookByUser(_:unknown, { userId}:{userId:string}) {
      const book = await getUserBook(userId);
      return book;
    },
  },


   
  Mutation: {
    async createBook(_:unknown,{ title, author, pageCount, genre, publisher, description, datePublished }:createBookInterface,
      context:any) 
      {
      if (!context.user) {
        return null;
      }

      const newBook = await addBook({
        title,
        author,
        datePublished,
        pageCount,
        genre,
        publisher,
        description,
      });
      return newBook;
    },
  
    

    async updateBook(
      root:string,
      {
        _id,
        title,
        author,
        datePublished,
        description,
        pageCount,
        genre,
        publisher,
      }:editBookInterface
    ) {
      const updatedBook = await editBook({
        _id,
        title,
        author,
        datePublished,
        description,
        pageCount,
        genre,
        publisher,
      });
      return updatedBook;
    },

    async deleteBook (_:unknown, {_id}:{_id:string}) {
      return removeBook(_id)
    },

    async deleteUser (_:unknown, {_id}:{_id:string}) {
      return removeUser(_id)
    },

    async createUser(_:unknown, { email, name, password }:{email:string,name:string,password:string}) {
      const newUser = await insertUser({ email, name, password });
      return newUser;
    },

    async updateUser(
      root:string,
      {
        _id,
        name,
        email,
        password,
        
      }:userId
    ) {
      const updatedUser = await editUser({
        _id,
        name,
        email,
        password,
      });
      return updatedUser;
    },
       
    async loginUser(_:unknown, { email, password }:{email:string,password:string}, {}) {
      const user = await logUserIn({ email, password });
      return user;
    },
  },
};


