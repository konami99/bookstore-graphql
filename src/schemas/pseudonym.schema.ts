import "reflect-metadata";
import { MaxLength, Length, ValidateNested } from "class-validator";
import { Field, ObjectType, InputType, ID } from "type-graphql"
import { Author } from "./author.schema";

@ObjectType()
export class Pseudonym {
  @Field(type => ID)
  id!: number

  @Field()
  name!: string

  @Field(type => Author)
  author?: Author

  @Field(type => Date)
  createdAt: Date
}