import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    datePublished: { type: String },
    description: { type: String, required: true },
    pageCount: { type: Number, required: true },
    genre: { type: String, required: true },
    publisher: { type: String, required: true },
   
  },
  {
    timestamps: true,
  }
);

export const BookModel = mongoose.model("books", BookSchema);
