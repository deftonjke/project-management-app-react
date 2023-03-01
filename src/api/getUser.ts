import { API_URL } from '../data/constants';
import dict from '../data/dict';
import { ApiUserInfo, Languages } from '../data/interfaces';
import { toastErrorDark, toastWarnDark } from '../utils/toast';

export default async function getUser(id: string, logoutUser: () => void, lang: Languages) {
  const url = `${API_URL}/users/${id}`;
  const token = localStorage.getItem('pmapp34-token') || '';

  if (!token) {
    toastErrorDark(dict[lang].toastInvToken);
    logoutUser();
    return false;
  }

  let res = {} as Response;

  try {
    res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  } catch {
    toastWarnDark(dict[lang].toastNoServResp);
    return false;
  }

  if (res.ok) {
    const user: ApiUserInfo = await res.json();
    return user;
  }

  if (res.status >= 400 && res.status <= 499) {
    toastErrorDark(dict[lang].toastUserNotFound);
  }

  if (res.status >= 500) {
    toastWarnDark(dict[lang].toastServError);
  }
  return false;
}
