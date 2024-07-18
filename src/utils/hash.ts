import bcryptjs from 'bcryptjs';


export const getHashPassword = async (password: string) => {
  const salt = bcryptjs.genSaltSync(10);
  const hashPassword = bcryptjs.hashSync(password, salt);
  return hashPassword;
};
