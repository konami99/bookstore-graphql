import "reflect-metadata";
import { MaxLength, Length, ValidateNested } from "class-validator";
import { Arg, Resolver, Mutation, Query, Ctx, Field, InputType } from "type-graphql"
import { Author } from "../schemas/author.schema";
import { addAuthor } from "../mutations/author.mutation";
import { getAuthor, listAuthors } from "../queries/author.query";
import { MyContext } from '../context'

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

@Resolver()
export class AuthorResolver {
  @Mutation(returns => Author)
  async addAuthor(@Arg("data") newAuthorData: AuthorInput): Promise<Author> {
    return addAuthor(newAuthorData)
  }

  @Query(returns => Author)
  async getAuthor(@Ctx() { authAuthor }: MyContext, @Arg("id") id: string, @Arg("name") username: string): Promise<Author> {
    if (authAuthor == null) {
      throw new Error('Authentication failed')
    }
    
    const author = await getAuthor(id, username)

    console.log(author)

    if (author == null) {
      throw new Error('User not found')
    }

    return author
  }

  @Query(returns => [Author])
  async listAuthors(): Promise<Author[]> {
    return listAuthors()
  }
}