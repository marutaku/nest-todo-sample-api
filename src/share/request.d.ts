export interface RequestWithJwtInfo extends Request {
  user: {
    id: string;
    name: string;
  };
}
