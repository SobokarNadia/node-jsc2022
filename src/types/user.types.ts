import { Model } from "mongoose";

export interface IPaginationResponse<T> {
  page: number;
  totalItems: number;
  perPage: number;
  itemsFound: number;
  data: T[];
}

export interface IQuery {
  page: string;
  perPage: string;
  sortedBy: string;

  [key: string]: string;
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  gender?: string;
  status?: string;
  avatar?: string;
}

export interface IUserMethods {
  nameWithAge(): string;
}

export interface IUserModel
  extends Model<IUser, object, IUserMethods, IUserVirtuals> {
  findByName(name: string): Promise<IUser[]>;
}

export interface IUserVirtuals {
  nameWithSurname: string;
}
