import "reflect-metadata";
import { MaxLength, Length, ValidateNested } from "class-validator";
import { Field, ObjectType, InputType, ID } from "type-graphql"
import { Pseudonym } from "./pseudonym";
import { BankAccount } from "./bankaccount";
import { Book } from "./book";
import { BooksOnAuthors } from "./bookonauthor";

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
  bankAccounts: BankAccount[] | null

  @Field(type => Date)
  createdAt: Date

  @Field(type => Date)
  updatedAt: Date
}







@InputType()
export class AuthorInput {
  @Field()
  @MaxLength(30)
  name!: string;

  @Field()
  @MaxLength(10)
  gender!: string;

  @Field()
  @MaxLength(30)
  username!: string;

  @Field()
  @MaxLength(30)
  password!: string;

  @Field()
  @MaxLength(30)
  pseudonym!: string;

  @Field(type => [BankAccountInput], { nullable: true })
  @ValidateNested()
  bankAccounts: BankAccountInput[]

  @Field(type => [BookInput], { nullable: true })
  @ValidateNested()
  books: BookInput[]
}

@InputType()
export class BankAccountInput {
  @Field()
  @MaxLength(30)
  accountNumber!: string;
}

@InputType()
export class BookInput {
  @Field()
  @MaxLength(30)
  title!: string;
}