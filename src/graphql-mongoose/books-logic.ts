import { UserModel } from "../mongoose-schema/userModel";
import { BookModel } from "../mongoose-schema/bookModel";
import { GraphQLError } from "graphql";

const graphQlError = (message: string) => {
  throw new GraphQLError(message, {
    extensions: {
      code: "BAD_USER_INPUT",
    },
  });
};
 
export interface createBookInterface {
     title: string,
     author: string,
     datePublished: string,
     pageCount: number,
     genre: string,
     publisher: string,
     description: string

}



export const addBook = async ({
  title,
  author,
  datePublished,
  pageCount,
  genre,
  publisher,
  description,
}:createBookInterface) => {
  try {
    const isTitleExist = await BookModel.findOne({ title });
    if (isTitleExist) {
      graphQlError("Duplicate title");
    }

    const newBook = await BookModel.create({
      title,
      author,
      datePublished,
      pageCount,
      genre,
      publisher,
      description,
    });
    return newBook;

  } catch (error) {
    return error;
  }
};


export const getBook = async (id:string) => {
  try {
    const book = await BookModel.findById(id);
    if (!book) {
      graphQlError("Book not found");
    }
    return book;

  } catch (error) {
    return error;
  }
};


export const getBooks = async () => {
  const books = await BookModel.find();
  return books;
};


export const getUserBook = async (id:string) => {
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      graphQlError("User not found");
    }

    const book = await BookModel.findOne({ userId: id });
    if (!book) {
     return graphQlError("User has not created a book");
    }
    return book;

  } catch (error) {
    return error;
  }
};

export interface editBookInterface extends createBookInterface {
    _id: string
}

export const editBook = async ({
  _id,
  title,
  author,
  datePublished,
  description,
  pageCount,
  genre,
  publisher,
}:editBookInterface) => {
  try {
    const update = {
      title,
      author,
      datePublished,
      description,
      pageCount,
      genre,
      publisher,
    };


    const editedBook = await BookModel.updateOne({_id}, update);
    return editedBook.modifiedCount;
  } catch (error) {
    return error;
  }
};


export const removeBook = async (id:string) => {
  try {
    const book =  await BookModel.findById(id)

    if(!book) {
     return graphQlError("Book not found")
    }

    const check = await BookModel.findByIdAndDelete(id)
    return {message: "Book deleted successfully"}

  } catch (error) {
    return error
  }
}
