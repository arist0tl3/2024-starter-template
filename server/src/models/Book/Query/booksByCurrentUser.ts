import { IContext } from "../../../types";

import { Book } from "../../../generated";

async function eventsByCurrentUser(
  parent: undefined,
  args: undefined,
  context: IContext
): Promise<Event[]> {
  try {
    if (!context?.currentUser?._id)
      throw new Error("You must be logged in to do this");

    return context.models.Book.find({
      createdById: context.currentUser._id,
      deleted: {
        $ne: true,
      },
    });
  } catch (err) {
    return [];
  }
}

export default eventsByCurrentUser;
