import "reflect-metadata";
import { MaxLength, Length, ValidateNested } from "class-validator";
import { Field, ObjectType, InputType, ID } from "type-graphql"
import { BooksOnAuthors } from './bookonauthor'

@ObjectType()
export class Book {
  @Field(type => ID)
  id!: number

  @Field()
  title!: string

  @Field(type => [BooksOnAuthors], { nullable: true })
  authors?: BooksOnAuthors[] | null

  @Field(type => Date)
  createdAt: Date

  @Field(type => Date)
  updatedAt: Date
}