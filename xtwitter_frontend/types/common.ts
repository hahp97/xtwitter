export interface IPlainObject {
  [key: string]: any;
}

export type TDataResponseUser = {
  message: string;
  user: {
    userName: string;
    email: string;
  };
  token: string;
};
