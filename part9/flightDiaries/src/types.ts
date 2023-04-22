export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;
export enum Weather {
  Sunny = 'Sunny',
  Rainy = 'Rainy',
  Cloudy = 'Cloudy',
  Stormy = 'Stormy',
  Windy = 'Windy',
}
export enum Visibility {
  Great = 'Great',
  Good = 'Good',
  OK = 'OK',
  Poor = 'Poor',
}
export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}
