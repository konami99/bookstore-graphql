import "reflect-metadata";
import { MaxLength, Length, ValidateNested } from "class-validator";
import { Field, ObjectType, InputType, ID } from "type-graphql"

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

  @Field()
  pseudonym: string

  @Field(type => [BooksOnAuthors], { nullable: true })
  books?: BooksOnAuthors[] | null

  @Field(type => [BankAccount], { nullable: true })
  bankAccounts?: BankAccount[] | null

  @Field(type => Date)
  createdAt: Date

  @Field(type => Date)
  updatedAt: Date
}

@ObjectType()
export class BankAccount {
  @Field(type => ID)
  id!: number

  @Field()
  accountNumber!: string

  @Field(type => Author, { nullable: true })
  author?: Author | null

  @Field(type => Date)
  createdAt: Date

  @Field(type => Date)
  updatedAt: Date
}

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

@ObjectType()
export class BooksOnAuthors {
  @Field(type => Book, { nullable: true })
  book?: Book | null

  @Field(type => Author, { nullable: true })
  author?: Author | null

  @Field(type => Date)
  createdAt: Date
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
  bankAccounts: [BankAccountInput]
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