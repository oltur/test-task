import { TestTaskPage } from './app.po';

describe('test-task App', () => {
  let page: TestTaskPage;

  beforeEach(() => {
    page = new TestTaskPage();
  });

  it('should display title', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Test Task for WebTrekk');
  });
});
