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

  @Field(type => [BooksOnAuthors])
  books: [BooksOnAuthors]

  @Field(type => [BankAccount])
  bankAccounts: [BankAccount]

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

  @Field(type => Author)
  author!: Author

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

  @Field(type => [BooksOnAuthors])
  authors!: [BooksOnAuthors]

  @Field(type => Date)
  createdAt: Date

  @Field(type => Date)
  updatedAt: Date
}

@ObjectType()
export class BooksOnAuthors {
  @Field(type => Book)
  book!: Book

  @Field(type => Author)
  author!: Author

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

  @Field(type => [BookInput])
  @ValidateNested()
  books: [BookInput]

  @Field(type => [BankAccountInput])
  @ValidateNested()
  bankAccounts: [BankAccountInput]
}

@InputType()
export class BookInput {
  @Field()
  @MaxLength(30)
  title!: string;
}

@InputType()
export class BankAccountInput {
  @Field()
  @MaxLength(30)
  accountNumber!: string;
}