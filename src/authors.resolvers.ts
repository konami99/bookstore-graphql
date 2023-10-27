import "reflect-metadata";
import { Author } from '@prisma/client';
import { Arg, Resolver, Mutation, Query, Ctx } from "type-graphql"
import { AuthorInput, Author as AuthorType } from "./authors.schema";
import { addAuthor } from "./mutations/authors.mutations";
import { getAuthor, listAuthors } from "./queries/authors.queries";
import { MyContext } from './context'


@Resolver()
export class AuthorResolver {
  @Mutation(returns => AuthorType)
  async addAuthor(@Arg("data") newAuthorData: AuthorInput): Promise<Author> {
    return addAuthor(newAuthorData)
  }

  @Query(returns => AuthorType)
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

  @Query(returns => [AuthorType])
  async listAuthors(): Promise<Author[]> {
    return listAuthors()
  }
}