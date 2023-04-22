import { DiaryEntry } from '../src/types';
import toNewDiaryEntry from '../src/utils';

const data = [
  {
    id: 1,
    date: '2017-01-01',
    weather: 'Rainy',
    visibility: 'Poor',
    comment: "Pretty scary flight, I'm glad I'm alive",
  },
  {
    id: 2,
    date: '2017-04-01',
    weather: 'Sunny',
    visibility: 'Good',
    comment: "Everything went better than expected, I'm learning much",
  },
  {
    id: 3,
    date: '2017-04-15',
    weather: 'Windy',
    visibility: 'Good',
    comment: "I'm getting pretty confident although I hit a flock of birds",
  },
  {
    id: 4,
    date: '2017-05-11',
    weather: 'Cloudy',
    visibility: 'Good',
    comment: 'I almost failed the landing but I survived',
  },
];

const diaryEntries: DiaryEntry[] = data.map((obj) => {
  const object = toNewDiaryEntry(obj) as DiaryEntry;
  object.id = obj.id;
  return object;
});

export default diaryEntries;
