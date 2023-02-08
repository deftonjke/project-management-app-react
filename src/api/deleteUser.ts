import { API_URL } from '../data/constants';
import dict from '../data/dict';
import { Languages } from '../data/interfaces';
import { toastErrorDark, toastSuccessDark, toastWarnDark } from '../utils/toast';
import validateUser from './_validateUser';

const deleteUser = async (
  logoutUser: () => void,
  setSpinner: React.Dispatch<React.SetStateAction<boolean>>,
  lang: Languages
) => {
  const userData = await validateUser(logoutUser, setSpinner, lang);

  if (userData) {
    setSpinner(true);

    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };

    let res = {} as Response;

    try {
      res = await fetch(`${API_URL}/users/${userData.id}`, options);
    } catch (err) {
      toastWarnDark(dict[lang].toastNoServResp);
      setSpinner(false);
      return false;
    }

    setSpinner(false);

    if (res.ok) {
      toastSuccessDark(dict[lang].toastUserRemoved);
      logoutUser();
      return true;
    }

    if (res.status === 401) {
      toastErrorDark(dict[lang].toastInvToken);
      logoutUser();
    } else if (res.status >= 400 && res.status <= 499) {
      toastErrorDark(dict[lang].toastUserNotFound);
    } else if (res.status >= 500) {
      toastWarnDark(dict[lang].toastServError);
    }
  }

  return false;
};

export default deleteUser;
