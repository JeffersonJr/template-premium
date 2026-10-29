export function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

export function formatThousands(value: string | number | undefined) {
  const digits = digitsOnly(String(value ?? ""));
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function applyThousandsMask(event: { currentTarget: HTMLInputElement }) {
  const input = event.currentTarget;
  const cursor = input.selectionStart ?? input.value.length;
  const digitsBeforeCursor = digitsOnly(input.value.slice(0, cursor)).length;
  const formatted = formatThousands(input.value);
  input.value = formatted;

  let nextCursor = 0;
  let digitsSeen = 0;
  while (nextCursor < formatted.length && digitsSeen < digitsBeforeCursor) {
    if (/\d/.test(formatted[nextCursor]!)) digitsSeen += 1;
    nextCursor += 1;
  }
  input.setSelectionRange(nextCursor, nextCursor);
}

export function parseIntegerInput(value: string) {
  const digits = digitsOnly(value);
  return digits ? Number(digits) : undefined;
}

export function maskBrazilianPhone(value: string) {
  let digits = digitsOnly(value);
  if (digits.startsWith("55") && digits.length >= 12) digits = digits.slice(2);
  digits = digits.slice(0, 11);
  if (!digits) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function applyBrazilianPhoneMask(event: { currentTarget: HTMLInputElement }) {
  const input = event.currentTarget;
  const cursor = input.selectionStart ?? input.value.length;
  const digitsBeforeCursor = digitsOnly(input.value.slice(0, cursor)).length;
  const formatted = maskBrazilianPhone(input.value);
  input.value = formatted;

  let nextCursor = 0;
  let digitsSeen = 0;
  while (nextCursor < formatted.length && digitsSeen < digitsBeforeCursor) {
    if (/\d/.test(formatted[nextCursor]!)) digitsSeen += 1;
    nextCursor += 1;
  }
  input.setSelectionRange(nextCursor, nextCursor);
}
