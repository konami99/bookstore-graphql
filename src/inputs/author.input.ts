import "reflect-metadata";
import { MaxLength, Length, ValidateNested } from "class-validator";
import { Arg, Resolver, Mutation, Query, Ctx, Field, InputType } from "type-graphql"
import { BankAccountInput } from "./bankaccount.input";
import { BookInput } from "./book.input";

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
  pseudonym: string;

  @Field(type => [BankAccountInput], { nullable: true })
  @ValidateNested()
  bankAccounts: BankAccountInput[]

  @Field(type => [BookInput], { nullable: true })
  @ValidateNested()
  books: BookInput[]
}