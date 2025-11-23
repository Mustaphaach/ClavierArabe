// Standard Arabic Keyboard Layouts

export const ARABIC_NUMBERS = ['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '٠'];

export const ROW_1 = ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح', 'ج', 'د'];
export const ROW_2 = ['ش', 'س', 'ي', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ك', 'ط'];
export const ROW_3 = ['ئ', 'ء', 'ؤ', 'ر', 'لا', 'ى', 'ة', 'و', 'ز', 'ظ'];
export const ROW_4 = ['ذ', 'أ', 'إ', 'آ', 'ـ']; // Variations and tatweel

export const TASHKEEL = ['َ', 'ً', 'ُ', 'ٌ', 'ِ', 'ٍ', 'ْ', 'ّ'];

export const PUNCTUATION = ['؟', '!', '.', '،', '؛', ':', '"', "'", '(', ')'];

// English/Latin numbers for convenience if needed, but we focus on Arabic
export const LATIN_NUMBERS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

export interface KeyAction {
  char: string;
  type: 'char' | 'action';
  label?: string;
  width?: string; // Tailwind width class
}
