import { auth, clerkClient } from "@clerk/nextjs/server";
import { ApiError } from "./errors";

export const getAuthUser = async () => {
  const { userId } = await auth();
  if (!userId) throw new ApiError("Unauthorized", 401, "UNAUTHORIZED");
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  return { userId, user, client };
};
