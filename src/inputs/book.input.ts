import "reflect-metadata";
import { MaxLength, Length, ValidateNested } from "class-validator";
import { Arg, Resolver, Mutation, Query, Ctx, Field, InputType } from "type-graphql"

@InputType()
export class BookInput {
  @Field()
  @MaxLength(30)
  title!: string;
}