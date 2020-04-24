export interface Book {
  id?: string;
  author?: string;
  title?: string;
  pageCount: number;
}

export interface Author {
  id: string;
  name: string;
  bookIds?: string[];
}
