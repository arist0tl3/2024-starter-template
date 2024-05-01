import type { IContext } from "../../../types";
import type {
  MutationDeleteBookArgs,
  DeleteBookResponse,
} from "../../../generated";

async function deleteBook(
  parent: undefined,
  args: MutationDeleteBookArgs,
  context: IContext
): Promise<DeleteBookResponse> {
  try {
    if (!context.currentUser?._id)
      throw new Error("You must be logged in to do that");

    await context.models.Book.findOneAndUpdate(
      {
        _id: args.input.bookId,
        createdById: context.currentUser._id,
      },
      {
        $set: {
          deleted: true,
          deletedAt: new Date(),
          deletedById: context.currentUser._id,
        },
      }
    );

    return {
      success: true,
    };
  } catch (err: any) {
    return {
      error: err.toString(),
      success: false,
    };
  }
}

export default deleteBook;
