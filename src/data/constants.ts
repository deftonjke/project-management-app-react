import { Languages } from './interfaces';

export const API_URL = 'https://kanban-rest-jfch.onrender.com';

export const LANG_RU: Languages = 'RU';
export const LANG_EN: Languages = 'EN';

export const passRegExp = /^[a-zA-Z0-9!@#$&()\\-`.+,/\"]{8,30}$/;
export const userRegExp = /^[A-Za-z0-9]{4,20}$/;

export const SET_BOARDS = 'SET_BOARDS';

export const FORM_INVALID_MESSAGE = 'at least one character';
export const titleRegex = /^.*[^\s].*$/;
