import { newE2EPage } from '@stencil/core/testing';

describe('wtf-s-hero', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<wtf-s-hero></wtf-s-hero>');

    const element = await page.find('wtf-s-hero');
    expect(element).toHaveClass('hydrated');
  });
});
