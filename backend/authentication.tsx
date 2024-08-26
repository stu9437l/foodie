import { cookies } from 'next/headers';
import { parseJwt } from '../utils';
import { errorHandler } from './errorHandler';

interface AuthProps extends Request {
  user?: any;
}

const isAuthenticate = (request: AuthProps) => {
  try {
    const token: any = cookies().get(`token`);
    console.log({ token });
    if (!token) {
      return errorHandler(401, 'Unauthorized');
    }

    const user = parseJwt(token?.value);
    console.log({ user });
    request.user = user;
    return;
    // return NextResponse.next();
  } catch (err) {
    console.log({ err });
    return errorHandler(401, 'Unauthorized');
  }
};

const isAuthorized = (request: AuthProps, roles: string[]) => {
  const { role } = request?.user;
  console.log({ role });
  const isAcccess = roles.some((item, index) => item.includes(role));
  console.log({ isAcccess });
  if (!isAcccess) {
    return errorHandler(403, 'Access Denied');
  }
};

export { isAuthenticate, isAuthorized };
