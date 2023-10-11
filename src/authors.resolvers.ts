import "reflect-metadata";
import { Arg, Resolver, Mutation, Query } from "type-graphql"
import { AuthorInput, Author } from "./authors.schema";
import { addAuthor } from "./mutations/authors.mutations";
import { getAuthor, listAuthors } from "./queries/authors.queries";

@Resolver()
export class AuthorResolver {
  @Mutation(returns => Author)
  async addAuthor(@Arg("data") newAuthorData: AuthorInput): Promise<Author> {
    return addAuthor(newAuthorData)
  }

  @Query(returns => Author)
  async getAuthor(@Arg("id") id: string): Promise<Author> {
    return getAuthor(parseInt(id))
  }

  @Query(returns => [Author])
  async listAuthors(): Promise<Author[]> {
    return listAuthors()
  }
}