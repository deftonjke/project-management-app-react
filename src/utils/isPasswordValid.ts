import { passRegExp } from '../data/constants';

export default function IS_PASSWORD_VALID(password: string): boolean {
  const regex = passRegExp;
  return regex.test(password);
}
