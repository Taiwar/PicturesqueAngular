import { Author } from './author.model';

export class Picture {
  slug: string;
  title = '';
  description = '';
  image: String;
  tagList: Array<string> = [];
  createdAt: string;
  updatedAt: string;
  author: Author;
}
