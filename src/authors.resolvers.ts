import "reflect-metadata";

import { Arg, Resolver, Mutation, Query, Ctx } from "type-graphql"
import { AuthorInput, Author } from "./authors.schema";
import { addAuthor } from "./mutations/authors.mutations";
import { getAuthor, listAuthors } from "./queries/authors.queries";
import { MyContext } from './context'


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