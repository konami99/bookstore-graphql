import "reflect-metadata";
import { MaxLength, Length, ValidateNested } from "class-validator";
import { Field, ObjectType, InputType, ID } from "type-graphql"
import { Author } from "./author";

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