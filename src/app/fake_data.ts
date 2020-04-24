export const authorBookMap: { [authorId: string]: string[] } = {
  '0': ['0'],
  '1': ['1'],
  '2': ['2'],
  '3': ['3'],
  '4': ['4'],
  '5': ['5', '6'],
  '6': ['6', '7', '8'],
};

export function getAuthorName(bookId: string) {
  const entry = Object.entries(authorBookMap).find(([, bookIds]) =>
    bookIds.includes(bookId)
  )!;
  return authorNames[Number(entry[0])];
}

export const bookTitles = [
  'Giants And Owls',
  'Serpent Without Courage',
  'Duke Of The World',
  'Warriors Of Utopia',
  'Trees Without Honor',
  'Officers And Knights',
  'Country Of The Banished',
  'Faith Of Water',
  'Fighting The South',
  'Whispers In The Future',
];

export const authorNames = [
  'Hermione Surveyor',
  'Juno Elbow',
  'Anne Alcibiades',
  'Dionyza Simonides',
  'Margaret Rumi',
  'Iris Lorca',
  'Toby Adam',
  'Maria Cato',
  'Phebe Buson',
  'Li Conrade',
];
