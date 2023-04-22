import diaries from '../../data/diaries';

import { DiaryEntry, NonSensitiveDiaryEntry, NewDiaryEntry } from '../types';

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
  const newEntry = {
    id: Math.max(...diaries.map((d) => d.id)) + 1,
    ...entry,
  };

  diaries.push(newEntry);
  return newEntry;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const findById = (id: number): DiaryEntry | undefined => {
  return diaries.find((d) => d.id === id);
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
  findById,
};
