import { TestTaskPage } from './app.po';

describe('test-task App', () => {
  let page: TestTaskPage;

  beforeEach(() => {
    page = new TestTaskPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
