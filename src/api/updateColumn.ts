import { API_URL } from '../data/constants';
import dict from '../data/dict';
import { ColumnsResponse, Languages } from '../data/interfaces';
import { toastErrorDark, toastWarnDark } from '../utils/toast';
import getColumnSingle from './getColumnSingle';
import validateUser from './_validateUser';

export default async function updateColumn(
  boardId: string,
  colId: string,
  order: number,
  logoutUser: () => void,
  setSpinner: React.Dispatch<React.SetStateAction<boolean>>,
  lang: Languages,
  title?: string
) {
  const userData = await validateUser(logoutUser, setSpinner, lang);

  if (userData) {
    setSpinner(true);

    const url = `${API_URL}/boards/${boardId}/columns/${colId}`;

    let newTitle = ' ';
    if (title) {
      newTitle = title;
    } else if (!title) {
      const res = await getColumnSingle(boardId, colId, logoutUser, lang);
      if (res) {
        newTitle = res.title || ' ';
      }
    }

    const options = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${userData.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: newTitle,
        order,
      }),
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
      const column: ColumnsResponse = await res.json();
      return column;
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
