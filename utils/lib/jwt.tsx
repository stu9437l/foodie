import jwt from 'jsonwebtoken';

const SECREKEKEY = 'SECRETE_KEY';

const generateJwt = async (data: any) => {
  console.log({ data });
  var token = jwt.sign(data, SECREKEKEY, { expiresIn: '1 day' });

  return token;
};

const verifyJwtToken =  (token: string) => {
  const user = jwt.verify(token, SECREKEKEY);
  return user;
};

export { generateJwt, verifyJwtToken };
