import { auth, clerkClient } from "@clerk/nextjs/server";
import { ApiError } from "./errors";
import { ERROR_MESSAGES, ERROR_CODES } from "./constants";

export const getAuthUser = async () => {
  const { userId } = await auth();
  if (!userId)
    throw new ApiError(
      ERROR_MESSAGES.UNAUTHORIZED,
      401,
      ERROR_CODES.UNAUTHORIZED,
    );
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  return { userId, user, client };
};
