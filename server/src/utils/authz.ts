import { Request } from "express";

type AuthedRequest = Request & { user?: { id?: string; isAdmin?: boolean } };

// The id of the authenticated user (from the verified JWT), never from the request body.
export const currentUserId = (req: Request): string | undefined =>
  (req as AuthedRequest).user?.id;

export const isAdmin = (req: Request): boolean =>
  Boolean((req as AuthedRequest).user?.isAdmin);

// True when the authenticated user is the given user, or an admin.
export const isSelfOrAdmin = (req: Request, userId: unknown): boolean =>
  isAdmin(req) || (currentUserId(req) !== undefined && currentUserId(req) === String(userId));
