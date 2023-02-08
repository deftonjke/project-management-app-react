export default function loginWithToken(
  token: string,
  dispatchIsAuth: React.Dispatch<React.SetStateAction<boolean>>
): void {
  localStorage.setItem('pmapp34-token', token);
  dispatchIsAuth(true);
}
