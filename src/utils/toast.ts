import { toast } from 'react-toastify';

export const toastErrorDark = (message: string) =>
  toast.error(message, { theme: 'dark', pauseOnFocusLoss: false, autoClose: 1500 });
export const toastWarnDark = (message: string) =>
  toast.warn(message, { theme: 'dark', pauseOnFocusLoss: false, autoClose: 1500 });
export const toastSuccessDark = (message: string) =>
  toast.success(message, { theme: 'dark', pauseOnFocusLoss: false, autoClose: 1500 });
export const toastInfoDark = (message: string) =>
  toast.info(message, { theme: 'dark', pauseOnFocusLoss: false, autoClose: 1500 });

export const toastErrorColored = (message: string) =>
  toast.error(message, { theme: 'colored', pauseOnFocusLoss: false, autoClose: 1500 });
export const toastWarnColored = (message: string) =>
  toast.warn(message, { theme: 'colored', pauseOnFocusLoss: false, autoClose: 1500 });
export const toastSuccessColored = (message: string) =>
  toast.success(message, { theme: 'colored', pauseOnFocusLoss: false, autoClose: 1500 });
export const toastInfoColored = (message: string) =>
  toast.info(message, { theme: 'colored', pauseOnFocusLoss: false, autoClose: 1500 });

export const toastErrorDef = (message: string) => toast.error(message);
export const toastWarnDef = (message: string) => toast.warn(message);
export const toastSuccessDef = (message: string) => toast.success(message);
export const toastInfoDef = (message: string) => toast.info(message);
