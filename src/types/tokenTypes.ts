import { IUser } from "./user.types";

export type IActionPayload = Pick<IUser, "_id">;

export type IPayload = Pick<IUser, "_id" | "name">;

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}
