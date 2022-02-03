import { JsonWebTokenProvider } from './JsonWebTokenProvider';

describe('jsonWebToken', () => {
  let jsonWebTokenProvider: JsonWebTokenProvider;

  beforeEach(() => {
    jsonWebTokenProvider = new JsonWebTokenProvider();
  });

  it('should be able to generate a new token', async () => {
    const payload = {
      profileId: 4,
      planId: 6,
    };
    const expiresIn = '20s';
    const secret = 'supersecret';

    const { token } = await jsonWebTokenProvider.generateToken(
      payload,
      secret,
      expiresIn,
    );

    expect(token.length > 0).toEqual(true);
  });

  it('should be able to validate a token', async () => {
    const payload = {
      profileId: 4,
      planId: 6,
    };
    const expiresIn = '20s';
    const secret = 'supersecret';

    const { token } = await jsonWebTokenProvider.generateToken(
      payload,
      secret,
      expiresIn,
    );

    const authToken = {
      token: `Bearer ${token}`,
    };
    const { planId } = await jsonWebTokenProvider.validatedToken(
      authToken.token,
      secret,
    );

    expect(planId).toEqual(6);
  });
});
