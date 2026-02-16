
export interface LetterData {
  diseases: string[];
  symptoms: string[];
  prevention: string[];
}

export interface AgeReport {
  min: number;
  max: number;
  report: string;
}

export type ScanState = 'IDLE' | 'FORM' | 'SCANNING' | 'PROCESSING' | 'RESULT' | 'LOCKED';

export interface UserInfo {
  name: string;
  age: number;
  gender: 'male' | 'female';
}
