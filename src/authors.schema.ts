import "reflect-metadata";
import { Field, ObjectType, InputType, ID } from "type-graphql"

@ObjectType()
export class Author {
  @Field(type => ID)
  id!: number

  @Field()
  name!: string

  @Field()
  gender!: string

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
export class Pseudonym {
  @Field(type => ID)
  id!: number

  @Field()
  name!: string

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

  @Field((type) => Date)
  createdAt: Date
}

@InputType()
export class AuthorInput {
  @Field()
  name!: string;

  @Field()
  gender!: string;

  @Field(type => [PseudonymInput])
  pseudonym!: PseudonymInput

  @Field(type => [BookInput], { nullable: true })
  books: [BookInput]

  @Field(type => BankAccountInput, { nullable: true })
  bankAccounts: [BankAccountInput]
}

@InputType()
export class PseudonymInput {
  @Field()
  name!: string;
}

@InputType()
export class BookInput {
  @Field()
  title!: string;
}

@InputType()
export class BankAccountInput {
  @Field()
  accountNumber!: string;
}