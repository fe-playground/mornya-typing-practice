export function getTimeString (date) {
  if (date) {
    const yy = date.getFullYear()
    const mm = date.getMonth() + 1
    const dd = date.getDay()
    const hh = date.getHours()
    const mi = date.getMinutes()
    const ss = date.getSeconds()
    const ms = date.getMilliseconds()
    return `${yy}년 ${mm}월 ${dd}일 ${hh}시 ${mi}분 ${ss}초 ${ms}ms`
  }
  return ''
}

export function diffTimeString (elapsed) {
  const sec = Math.floor(elapsed / 1000) // 1000ms = 1s
  const ms = elapsed % 1000
  const mi = Math.floor(sec / 60)
  const ss = sec % 60
  return `${mi}분 ${ss}초 ${ms}ms`
}
