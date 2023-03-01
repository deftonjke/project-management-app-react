import { API_URL } from '../data/constants';
import dict from '../data/dict';
import { ApiUserInfo, Languages } from '../data/interfaces';
import { toastErrorDark, toastInfoDark, toastWarnDark } from '../utils/toast';
import validateUser from './_validateUser';

const updateUser = async (
  name: string,
  login: string,
  password: string,
  logoutUser: () => void,
  setSpinner: React.Dispatch<React.SetStateAction<boolean>>,
  lang: Languages
) => {
  const userData = await validateUser(logoutUser, setSpinner, lang);

  if (userData) {
    setSpinner(true);

    const options = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${userData.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, login, password }),
    };

    let res = {} as Response;

    let user: ApiUserInfo = {
      login: '',
      id: '',
      name: '',
    };

    try {
      res = await fetch(`${API_URL}/users/${userData.id}`, options);
      user = await res.json();
    } catch (err) {
      toastWarnDark(dict[lang].toastNoServResp);
      setSpinner(false);
      return false;
    }

    setSpinner(false);

    if (res.ok) {
      toastInfoDark(dict[lang].toastInfoUpdUser);
      return user;
    }

    if (res.status === 401) {
      toastErrorDark(dict[lang].toastInvToken);
      logoutUser();
    } else if (res.status >= 400 && res.status <= 499) {
      toastErrorDark(dict[lang].toastUserNotFound);
    } else if (res.status >= 500) {
      toastWarnDark(dict[lang].toastLoginTaken);
    }
  }

  return false;
};

export default updateUser;
