import { Component, Prop, Host, h } from '@stencil/core';

/**
 * @slot image - image markup
 * @slot description - Slot for the content of the description
 */
@Component({
  tag: 'wtf-s-hero',
  styleUrl: 'wtf-s-hero.css',
  shadow: true,
})
export class WtfSHero {

  /**
   * The description
   */
  @Prop() description: string;

  render() {
    return (
      <Host>
        <div>
          <slot name="image"></slot>
        </div>
        <div>
          <h2><span>w</span>eb componen<span>t</span>s(<span>f</span>)</h2>
          <p><slot name="description">Description Placeholder</slot></p>
        </div>
      </Host>
    );
  }

}
