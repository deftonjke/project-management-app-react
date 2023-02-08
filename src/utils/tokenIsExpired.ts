export default function tokenIsExpired(jwtIat: number) {
  const currentDate = new Date();
  const currSec = Math.round(currentDate.getTime() / 1000);
  return currSec - jwtIat - 60 * 60 * 24 > 0;
}
