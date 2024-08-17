const parseJwt = (token: string) => {
  if (!token) {
    return null;
  }
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) throw new Error('Invalid JWT structure');

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to parse JWT:', error);
    throw new Error('Invalid token');
  }
};

export { parseJwt };
