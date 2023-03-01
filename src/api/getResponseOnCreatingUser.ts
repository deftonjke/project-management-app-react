import { API_URL } from '../data/constants';
import dict from '../data/dict';
import { Languages } from '../data/interfaces';
import { toastWarnDark } from '../utils/toast';

export default async function getResponseOnCreatingUser(
  name: string,
  login: string,
  password: string,
  setSpinner: React.Dispatch<React.SetStateAction<boolean>>,
  lang: Languages
): Promise<Response> {
  setSpinner(true);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      login,
      password,
    }),
  };

  let res = {} as Response;

  try {
    res = await fetch(`${API_URL}/signup`, options);
  } catch {
    toastWarnDark(dict[lang].toastNoServResp);
    setSpinner(false);
    return res;
  }

  setSpinner(false);

  if (res.status >= 400 && res.status <= 499) {
    toastWarnDark(dict[lang].toastLoginExists);
  }

  if (res.status >= 500) {
    toastWarnDark(dict[lang].toastServError);
  }

  return res;
}
