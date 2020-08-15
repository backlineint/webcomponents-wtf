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
   * The title
   */
  @Prop() header: string;

  /**
   * The description
   */
  @Prop() description: string;

  /**
   * Action CTA
   */
  @Prop() action: string;

  render() {
    return (
      <Host>
        <div>
          <slot name="image"></slot>
        </div>
        <div>
          <h2>{this.header}</h2>
          <p><slot name="description">Description Placeholder</slot></p>
          <a href="">{this.action}</a>
        </div>
      </Host>
    );
  }

}
