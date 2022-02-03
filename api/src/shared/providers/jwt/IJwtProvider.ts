export interface IPayload {
  profileId: number;
  planId: number;
}
export interface IToken {
  token: string;
}

export interface IJwtProvider {
  generateToken(
    payload: IPayload,
    secret: string,
    expiresIn: string,
  ): Promise<IToken>;
  validatedToken(token: string, secret: string): Promise<IPayload>;
}
