import React, { Dispatch, SetStateAction, ReactElement } from 'react';

export type Languages = 'EN' | 'RU';

export interface BoardsResponse {
  id: string;
  title: string;
  description: string;
}

export interface BoardsAction {
  type: string;
  payload: BoardsResponse[];
}

export interface AppContextData {
  isAuth: boolean;
  setIsAuth: Dispatch<React.SetStateAction<boolean>>;
  lang: Languages;
  switchLang: Dispatch<React.SetStateAction<Languages>>;
  boards: BoardsResponse[];
  dispatchBoards: Dispatch<BoardsAction>;
  logoutUser: () => void;
  isSpinning: boolean;
  setSpinner: Dispatch<React.SetStateAction<boolean>>;
}

export interface AuthPopupData {
  message: string;
  setIsPopupShown: Dispatch<SetStateAction<boolean>>;
}

export interface ApiUserInfo {
  login: string;
  id: string;
  name: string;
}

export interface ApiUserQuery {
  name: string;
  login: string;
  password: string;
}

export interface JwtToken {
  iat: number;
  login: string;
  userId: string;
}

export interface ModalConfirmation {
  showModal: React.Dispatch<React.SetStateAction<boolean>>;
  message: ReactElement;
  modalCallback: () => Promise<void>;
}

export interface NewBoard {
  title: string;
  description: string;
}

export interface ColumnResponse {
  id: string;
  title: string;
  order: number;
}

export interface TaskResponse {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

export interface SearchTaskResponse {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  user: {
    name: string;
  };
  boardId: string;
  columnId: string;
}

export interface SearchTaskCard extends SearchTaskResponse {
  loadTasks: () => Promise<void>;
}

export interface ColumnsResponse extends ColumnResponse {
  tasks: TaskResponse[];
}

export interface BoardResponse {
  id: string;
  title: string;
  description: string;
  columns: ColumnsResponse[];
}
