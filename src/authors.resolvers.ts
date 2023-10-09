import "reflect-metadata";
import { Arg, Resolver, Mutation } from "type-graphql"
import { AuthorInput, Author } from "./authors.schema";
import { addAuthor } from "./mutations/authors.mutations";

@Resolver()
class AuthorResolver {

  @Mutation(returns => Author)
  async addAuthor(@Arg("data") newAuthorData: AuthorInput): Promise<Author> {
    const newAuthor = await addAuthor(newAuthorData)

    return newAuthor
  }
}