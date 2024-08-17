import bcrypt from 'bcrypt';
const passwordHash = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};
const comparePassword = async (password: string, savedPassword: string) => {
  console.log({ savedPassword, password });
  const isCorrect = await bcrypt.compare(password, savedPassword);
  return isCorrect;
};
export { passwordHash, comparePassword };
