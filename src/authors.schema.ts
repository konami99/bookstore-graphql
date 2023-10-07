import "reflect-metadata";
import { Field, ObjectType, InputType, ID } from "type-graphql"

@ObjectType()
export class Author {
  @Field(type => ID)
  id!: string

  @Field()
  name!: string

  @Field()
  gender!: string

  @Field(type => Pseudonym)
  pseudonym!: Pseudonym

  @Field(type => [BookOnAuthor])
  books: BookOnAuthor[]

  @Field(type => [BankAccount])
  bankAccounts: BankAccount[]
}

@ObjectType()
export class BankAccount {
  @Field(type => ID)
  id!: string

  @Field()
  accountNumber!: string

  @Field(type => Author)
  author!: Author
}

@ObjectType()
export class Pseudonym {
  @Field(type => ID)
  id!: string

  @Field()
  name!: string

  @Field(type => Author)
  author!: Author
}

@ObjectType()
export class Book {
  @Field(type => ID)
  id!: string

  @Field()
  title!: string

  @Field(type => [BookOnAuthor])
  authors!: BookOnAuthor[]
}

@ObjectType()
export class BookOnAuthor {
  @Field(type => ID)
  id!: string

  @Field(type => Book)
  book!: Book

  @Field(type => Author)
  author!: Author
}

@InputType()
class AuthorInput {
  @Field()
  name!: string;

  @Field()
  gender!: string;

  @Field()
  pseudonym!: PseudonymInput

  @Field()
  books: BookInput[]

  @Field()
  bankAccounts: BankAccountInput[]
}

@InputType()
class PseudonymInput {
  @Field()
  name!: string;
}

@InputType()
class BookInput {
  @Field()
  title!: string;
}

@InputType()
class BankAccountInput {
  @Field()
  accountNumber!: string;
}