import jwtDecode from 'jwt-decode';
import { API_URL } from '../data/constants';
import dict from '../data/dict';
import { ApiUserInfo, JwtToken, Languages } from '../data/interfaces';
import { toastErrorDark, toastWarnDark } from '../utils/toast';
import tokenIsExpired from '../utils/tokenIsExpired';

const validateUser = async (
  logoutUser: () => void,
  setSpinner: React.Dispatch<React.SetStateAction<boolean>>,
  lang: Languages
) => {
  setSpinner(true);
  const token = localStorage.getItem('pmapp34-token') || '';
  const logoutAndStopSpinner = () => {
    setSpinner(false);
    logoutUser();
  };

  if (!token) {
    toastErrorDark(dict[lang].toastInvToken);
    logoutAndStopSpinner();
    return false;
  }
  let encoded: JwtToken;
  try {
    encoded = jwtDecode(token);
  } catch {
    toastErrorDark(dict[lang].toastInvToken);
    logoutAndStopSpinner();
    return false;
  }

  if (tokenIsExpired(encoded.iat)) {
    toastWarnDark(dict[lang].toastTokenExp);
    logoutAndStopSpinner();
    return false;
  }
  const url = `${API_URL}/users/${encoded.userId}`;
  const options = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  let res = {} as Response;
  let user = {} as ApiUserInfo;
  try {
    res = await fetch(url, options);
    user = await res.json();
  } catch (err) {
    toastWarnDark(dict[lang].toastNoServResp);
    setSpinner(false);
    return false;
  }

  if (res.ok) {
    const { id, login, name } = user;
    setSpinner(false);
    return { token, id, login, name };
  }

  if (res.status === 401) {
    toastErrorDark(dict[lang].toastInvToken);
  } else if (res.status >= 400 && res.status <= 499) {
    toastErrorDark(dict[lang].toastUserNotFound);
  } else if (res.status >= 500) {
    toastWarnDark(dict[lang].toastServError);
  }

  logoutAndStopSpinner();
  return false;
};

export default validateUser;
