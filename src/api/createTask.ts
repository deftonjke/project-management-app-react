import { API_URL } from '../data/constants';
import dict from '../data/dict';
import { Languages, TaskResponse } from '../data/interfaces';
import { toastErrorDark, toastWarnDark } from '../utils/toast';
import validateUser from './_validateUser';

export default async function createTask(
  boardId: string,
  columnId: string,
  title: string,
  description: string,
  logoutUser: () => void,
  setSpinner: React.Dispatch<React.SetStateAction<boolean>>,
  lang: Languages
) {
  const userData = await validateUser(logoutUser, setSpinner, lang);

  if (userData) {
    setSpinner(true);

    const url = `${API_URL}/boards/${boardId}/columns/${columnId}/tasks`;

    const newTask = {
      title,
      description,
      userId: userData.id,
    };

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${userData.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    };

    let res = {} as Response;
    let task = {} as TaskResponse;

    try {
      res = await fetch(url, options);
      task = await res.json();
    } catch {
      toastWarnDark(dict[lang].toastNoServResp);
      setSpinner(false);
      return false;
    }

    setSpinner(false);

    if (res.ok) {
      return task;
    }

    if (res.status === 401) {
      toastErrorDark(dict[lang].toastInvToken);
      logoutUser();
    } else if (res.status >= 400 && res.status <= 499) {
      toastErrorDark(dict[lang].toastBadQuery);
    } else if (res.status >= 500) {
      toastWarnDark(dict[lang].toastServError);
    }
  }

  return false;
}
