'use server';

import { cookies } from 'next/headers';

const setCookie = (key: string, value: string) => {
  cookies().set(key, value, { secure: true });
};

const getCookie = (key: string) => {
  cookies().get(key);
};

const removeCookie = (key: string) => {
  cookies().delete(key);
};

export { setCookie, getCookie, removeCookie };
