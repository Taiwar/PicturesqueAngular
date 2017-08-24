import { PicturesqueANGULARPage } from './app.po';

describe('picturesque-angular App', () => {
  let page: PicturesqueANGULARPage;

  beforeEach(() => {
    page = new PicturesqueANGULARPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
