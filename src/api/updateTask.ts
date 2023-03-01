import { API_URL } from '../data/constants';
import dict from '../data/dict';
import { Languages, TaskResponse } from '../data/interfaces';
import { toastErrorDark, toastWarnDark } from '../utils/toast';
import validateUser from './_validateUser';

export default async function updateTask(
  boardId: string,
  columnId: string,
  taskId: string,
  title: string,
  order: number,
  description: string,
  userId: string,
  newBoardId: string,
  newColumnId: string,
  logoutUser: () => void,
  setSpinner: React.Dispatch<React.SetStateAction<boolean>>,
  lang: Languages
) {
  const userData = await validateUser(logoutUser, setSpinner, lang);

  if (userData) {
    setSpinner(true);

    const url = `${API_URL}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`;

    const updTask = {
      title,
      order,
      description,
      userId,
      boardId: newBoardId,
      columnId: newColumnId,
    };

    const options = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${userData.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updTask),
    };

    let res = {} as Response;

    try {
      res = await fetch(url, options);
    } catch {
      toastWarnDark(dict[lang].toastNoServResp);
      setSpinner(false);
      return false;
    }

    setSpinner(false);

    if (res.ok) {
      const task: TaskResponse = await res.json();
      return task;
    }

    if (res.status === 401) {
      toastWarnDark(dict[lang].toastInvToken);
      logoutUser();
    } else if (res.status >= 400 && res.status <= 499) {
      toastErrorDark(dict[lang].toastBadQuery);
    } else if (res.status >= 500) {
      toastWarnDark(dict[lang].toastServError);
    }
  }

  return false;
}
