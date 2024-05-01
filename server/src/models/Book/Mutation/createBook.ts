import { MutationCreateBookArgs, CreateBookResponse } from "../../../generated";

import { IContext } from "../../../types";

async function createBook(
  parent: undefined,
  args: MutationCreateBookArgs,
  context: IContext
): Promise<CreateBookResponse> {
  try {
    const userId = context?.currentUser?._id;

    if (!userId) throw new Error("You must be logged in to create an book");

    const book = await context.models.Book.create({
      author: args.input.author,
      createdById: userId,
      title: args.input.title,
    });

    return {
      book,
      success: true,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.toString(),
    };
  }
}

export default createBook;
