export interface IError extends Error {
  status: number;
}

export interface IResponse<T> {
  message: string;
  data: T;
}
