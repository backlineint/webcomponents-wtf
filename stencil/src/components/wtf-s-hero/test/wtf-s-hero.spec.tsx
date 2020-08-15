import { newSpecPage } from '@stencil/core/testing';
import { WtfSHero } from '../wtf-s-hero';

describe('wtf-s-hero', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [WtfSHero],
      html: `<wtf-s-hero></wtf-s-hero>`,
    });
    expect(page.root).toEqualHtml(`
      <wtf-s-hero>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </wtf-s-hero>
    `);
  });
});
