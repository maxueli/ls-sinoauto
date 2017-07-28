import { CloudshopPage } from './app.po';

describe('cloudshop App', () => {
  let page: CloudshopPage;

  beforeEach(() => {
    page = new CloudshopPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
