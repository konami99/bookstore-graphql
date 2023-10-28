import "reflect-metadata";
import { MaxLength, Length, ValidateNested } from "class-validator";
import { Field, ObjectType, InputType, ID } from "type-graphql"
import { Pseudonym } from "./pseudonym.schema";
import { BankAccount } from "./bankaccount.schema";
import { Book } from "./book.schema";
import { BooksOnAuthors } from "./bookonauthor.schema";

@ObjectType()
export class Author {
  @Field(type => ID)
  id!: number

  @Field()
  name!: string

  @Field()
  gender!: string

  @Field()
  username!: string

  @Field()
  password!: string

  @Field(type => Pseudonym, { nullable: true })
  pseudonym?: Pseudonym | null

  @Field(type => [BooksOnAuthors], { nullable: true })
  books?: BooksOnAuthors[] | null

  @Field(type => [BankAccount], { nullable: true })
  bankAccounts?: BankAccount[] | null

  @Field(type => Date)
  createdAt: Date

  @Field(type => Date)
  updatedAt: Date
}
