import "reflect-metadata";
import { MaxLength, Length, ValidateNested } from "class-validator";
import { Field, ObjectType, InputType, ID } from "type-graphql"
import { Book } from "./book";
import { Author } from "./author";

@ObjectType()
export class BooksOnAuthors {
  @Field(type => Book, { nullable: true })
  book?: Book | null

  @Field(type => Author, { nullable: true })
  author?: Author | null

  @Field(type => Date)
  createdAt: Date
}