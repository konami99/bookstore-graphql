import "reflect-metadata";
import { MaxLength, Length, ValidateNested } from "class-validator";
import { Arg, Resolver, Mutation, Query, Ctx, Field, InputType } from "type-graphql"
import { Author } from "../schemas/author.schema";
import { addAuthor } from "../mutations/author.mutation";
import { getAuthor, listAuthors } from "../queries/author.query";
import { MyContext } from '../context'
import { AuthorInput } from "../inputs/author.input";

@Resolver()
export class AuthorResolver {
  @Mutation(returns => Author)
  async addAuthor(@Arg("data") newAuthorData: AuthorInput): Promise<Author> {
    return addAuthor(newAuthorData)
  }

  @Query(returns => Author)
  async getAuthor(
    @Ctx() { authAuthor }: MyContext,
    @Arg("id", { nullable: true }) id: string,
    @Arg("username", { nullable: true }) username: string): Promise<Author> {

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