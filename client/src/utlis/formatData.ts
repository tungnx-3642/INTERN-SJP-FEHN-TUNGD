export function formatToVND(amount: number): string {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '0₫';
  }
  return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

export function formatTimeToVietnamese(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) {
    return '';
  }
  return d.toLocaleString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Ho_Chi_Minh',
  });
}
