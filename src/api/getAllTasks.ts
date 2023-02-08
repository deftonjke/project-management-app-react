import { API_URL } from '../data/constants';
import dict from '../data/dict';
import { Languages, SearchTaskResponse } from '../data/interfaces';
import { toastErrorDark, toastWarnDark } from '../utils/toast';
import validateUser from './_validateUser';

const getAllTasks = async (
  logoutUser: () => void,
  setSpinner: React.Dispatch<React.SetStateAction<boolean>>,
  lang: Languages
) => {
  const userData = await validateUser(logoutUser, setSpinner, lang);
  const defData: SearchTaskResponse[] = [];

  if (userData) {
    setSpinner(true);

    const options = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${userData.token}`,
      },
    };

    let res = {} as Response;
    let tasks: SearchTaskResponse[] = [];

    try {
      res = await fetch(`${API_URL}/search/tasks`, options);
      tasks = await res.json();
    } catch (err) {
      toastWarnDark(dict[lang].toastNoServResp);
      setSpinner(false);
      return defData;
    }

    setSpinner(false);

    if (res.ok) {
      return tasks;
    }

    if (res.status === 401) {
      toastErrorDark(dict[lang].toastInvToken);
      logoutUser();
    } else if (res.status >= 400 && res.status <= 499) {
      toastErrorDark(dict[lang].toastNoTasks);
    } else if (res.status >= 500) {
      toastWarnDark(dict[lang].toastServError);
    }
  }

  return defData;
};

export default getAllTasks;
