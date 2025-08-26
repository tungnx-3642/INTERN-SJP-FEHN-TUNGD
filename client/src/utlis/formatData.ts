export function formatToVND(amount: number): string {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '0₫';
  }
  return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}
