import "reflect-metadata";
import { MaxLength, Length, ValidateNested } from "class-validator";
import { Arg, Resolver, Mutation, Query, Ctx, Field, InputType } from "type-graphql"

@InputType()
export class BankAccountInput {
  @Field()
  @MaxLength(30)
  accountNumber!: string;
}