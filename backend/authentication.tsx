import { cookies } from 'next/headers';
import { parseJwt } from '../utils';
import { getCookie } from '../utils/lib/cookie';
import { NextResponse } from 'next/server';
import { errorHandler } from './errorHandler';

interface AuthProps extends Request {
  user?: any;
}
const isAuthenticate = (request: AuthProps) => {
  console.log({ request });
  try {
    const token = cookies().get('token');
    console.log({ token: !token, tokenv: !!token });

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
