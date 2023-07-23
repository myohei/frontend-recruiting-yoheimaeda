export type Body = {
  name: string;
  email: string;
  zip: string;
  prefecture: string;
  address1: string;
  address2?: string;
}
export type FormRepo = {
  post: (body: Body) => Promise<void>
}
