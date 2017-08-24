export class PictureListConfig {
  type = 'all';

  filters: {
    tag?: string,
    author?: string,
    limit?: number,
    offset?: number
  } = {};
}
