import { hash, genSalt } from 'bcrypt';

const hashPassword = async (password: string): Promise<string> => {

  const saltQtd: number = 10;

  const salt = await genSalt(saltQtd);

  return await hash(password, salt)


}

export default hashPassword;