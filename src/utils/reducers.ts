import { BoardsResponse, BoardsAction } from '../data/interfaces';
import { SET_BOARDS } from '../data/constants';

export const boardsReducer = (state: BoardsResponse[], { type, payload }: BoardsAction) => {
  switch (type) {
    case SET_BOARDS:
      return payload;
    default:
      return state;
  }
};
