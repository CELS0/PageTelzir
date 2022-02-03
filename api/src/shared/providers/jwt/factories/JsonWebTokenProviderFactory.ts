import { IJwtProvider } from '../IJwtProvider';
import { JsonWebTokenProvider } from '../implementations/JsonWebTokenProvider';

function JsonWebTokenProviderFactory(): IJwtProvider {
  return new JsonWebTokenProvider();
}

export { JsonWebTokenProviderFactory };
