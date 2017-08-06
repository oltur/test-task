import { TestTaskPage } from './app.po';

describe('test-task App', () => {
  let page: TestTaskPage;

  beforeEach(() => {
    page = new TestTaskPage();
  });

  it('should display title', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Angular 4 Sample App');
  });
});
