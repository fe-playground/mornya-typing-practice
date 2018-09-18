export function getTimeString(date: Date|null): string {
  if (date) {
    const yy: number = date.getFullYear();
    const mm: number = date.getMonth() + 1;
    const dd: number = date.getDay();
    const hh: number = date.getHours();
    const mi: number = date.getMinutes();
    const ss: number = date.getSeconds();
    const ms: number = date.getMilliseconds();
    return `${yy}년 ${mm}월 ${dd}일 ${hh}시 ${mi}분 ${ss}초 ${ms}ms`;
  }
  return '';
}

export function diffTimeString(elapsed: number): string {
  const sec = Math.floor(elapsed / 1000); // 1000ms = 1s
  const ms = elapsed % 1000;
  const mi = Math.floor(sec / 60);
  const ss = sec % 60;
  return `${mi}분 ${ss}초 ${ms}ms`;
}
