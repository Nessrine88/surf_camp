export interface FormData {
  [key: string]: string | number;
}

export function allDataFilledIn(formData: FormData): boolean {
  return Object.keys(formData).every(
    (key) => String(formData[key]).trim().length > 0
  );
}