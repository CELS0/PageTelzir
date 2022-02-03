import { formatJSONResponse } from '@libs/apiGateway';
import { sign, verify } from 'jsonwebtoken';
import { IJwtProvider, IPayload, IToken } from '../IJwtProvider';

class JsonWebTokenProvider implements IJwtProvider {
  async generateToken(
    // eslint-disable-next-line @typescript-eslint/ban-types
    payload: object,
    secret: string,
    expiresIn: string,
  ): Promise<IToken> {
    const token = sign(payload, secret, {
      expiresIn,
    });

    const authToken = {
      token,
    };

    return authToken;
  }

  async validatedToken(bearerToken: string, secret: string): Promise<IPayload> {
    try {
      const [, token] = bearerToken.split(' ');
      const payload = <IPayload>verify(token, secret);

      return payload;
    } catch (err) {
      throw formatJSONResponse('Invalid token', 401);
    }
  }
}

export { JsonWebTokenProvider };
