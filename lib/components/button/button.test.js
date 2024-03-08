import { html, fixture, expect } from "@open-wc/testing";
import { fake } from 'sinon';

import "./button";

// create basic tests for the button component
describe("mnml-button", () => {
  it("renders", async () => {
    const el = await fixture(html`<mnml-button>Button</mnml-button> `);

    expect(el).shadowDom.to.equalSnapshot();
  });

  it("passes the a11y audit", async () => {
    const el = await fixture(html`<mnml-button>Button</mnml-button> `);

    await expect(el).shadowDom.to.be.accessible();
  });

  // create a test that checks if the slot content is rendered
  it("renders slot content", async () => {
    const el = await fixture(html`<mnml-button>Button</mnml-button> `);
    const slot = el.shadowRoot?.querySelectorAll("slot")[1];
    const slotContent = slot?.assignedNodes()[0].textContent;

    expect(slotContent).to.equal("Button");
  });

  it("renders slot content with start icon", async () => {
    const el = await fixture(html`
      <mnml-button>
        <i slot="start">icon-start</i>
        Button
      </mnml-button>
    `);

    const slot = el.shadowRoot?.querySelector("slot[name=start]");

    slot?.addEventListener("slotchange", () => {
      const slotContent = slot?.assignedSlot?.textContent;
      expect(slotContent).to.equal("icon-start");
    });
  });

  it("renders slot content with end icon", async () => {
    const el = await fixture(html`
      <mnml-button>
        Button
        <i slot="end">icon-end</i>
      </mnml-button>
    `);

    const slot = el.shadowRoot?.querySelector("slot[name=end]");

    slot.addEventListener("slotchange", () => {
      const slotContent = slot?.assignedSlot?.textContent;
      expect(slotContent).to.equal("icon-end");
    })
  });

  it("renders slot content with start and end icon", async () => {
    const el = await fixture(html`
      <mnml-button>
        <i slot="start">icon-start</i>
        Button
        <i slot="end">icon-end</i>
      </mnml-button>
    `);

    const shadowRoot = el.shadowRoot;

    const slotStartNode = shadowRoot?.querySelector("slot[name=start]");
    const slotEndNode = shadowRoot?.querySelector("slot[name=end]");
    const slotContentNode = shadowRoot?.querySelectorAll("slot")[1];

    const slotContentStart = slotStartNode?.assignedSlot?.textContent;
    const slotContentEnd = slotEndNode?.assignedSlot?.textContent;
    const slotContent = slotContentNode?.assignedNodes()[1].textContent;

    expect(slotContent?.includes("Button")).to.be.true;

    slotStartNode?.addEventListener("slotchange", () => {
      expect(slotContentStart).to.equal("icon-start");
    })

    slotEndNode?.addEventListener("slotchange", () => {
      expect(slotContentEnd).to.equal("icon-end");
    })
  });

  it("passes the a11y audit", async () => {
    const el = await fixture(html`
      <mnml-button>
        <i slot="start">icon-start</i>
        Button
        <i slot="end">icon-end</i>
      </mnml-button>
    `);

    await expect(el).shadowDom.to.be.accessible();
  });

  it('adds the "disabled" attribute when the property is set', async () => {
    const el = await fixture(
      html` <mnml-button disabled>Button</mnml-button> `
    );
    const button = el.shadowRoot?.querySelector("button");

    expect(button?.hasAttribute("disabled")).to.be.true;
  });

  it('adds the "aria-haspopup" attribute when the property is set', async () => {
    const el = await fixture(html` <mnml-button menu>Button</mnml-button> `);
    const button = el.shadowRoot?.querySelector("button");

    expect(button?.hasAttribute("aria-haspopup")).to.be.true;
  });

  it('adds the "aria-pressed" attribute with the value "true" if present', async () => {
    const el = await fixture(
      html`<mnml-button aria-pressed="true">Button</mnml-button> `
    );
    const button = el.shadowRoot?.querySelector("button");

    expect(button?.getAttribute("aria-pressed")).to.equal("true");
  });

  it('adds the "aria-pressed" attribute with the value "true" if present', async () => {
    const el = await fixture(
      html`<mnml-button aria-pressed="false">Button</mnml-button> `
    );
    const button = el.shadowRoot?.querySelector("button");

    expect(button?.getAttribute("aria-pressed")).to.equal("false");
  });

  it('adds the "aria-label" attribute when the property is set', async () => {
    const el = await fixture(
      html`<mnml-button aria-label="Button label">Button</mnml-button> `
    );
    const button = el.shadowRoot?.querySelector("button");

    expect(button?.getAttribute("aria-label")).to.equal("Button label");
  });

  it('adds the "aria-labelledby" attribute when the property is set', async () => {
    const el = await fixture(
      html`<mnml-button aria-labelledby="button-label">Button</mnml-button> `
    );
    const button = el.shadowRoot?.querySelector("button");

    expect(button?.getAttribute("aria-labelledby")).to.equal("button-label");
  });

  it('adds the "aria-describedby" attribute when the property is set', async () => {
    const el = await fixture(
      html`<mnml-button aria-describedby="button-description"
        >Button</mnml-button
      > `
    );
    const button = el.shadowRoot?.querySelector("button");

    expect(button?.getAttribute("aria-describedby")).to.equal(
      "button-description"
    );
  });

  it('adds the "href" attribute when the property is set', async () => {
    const el = await fixture(
      html`<mnml-button href="https://example.com">Link</mnml-button> `
    );
    const button = el.shadowRoot?.querySelector("a");

    expect(button?.getAttribute("href")).to.equal("https://example.com");
  });

  it('triggers the "click" event when the Enter key is pressed', async () => {
    const callback = fake();
    const el = await fixture(html`<mnml-button @click=${callback}>Button</mnml-button> `);
    const button = el.shadowRoot?.querySelector("button");

    setTimeout(() => {
      expect(callback.called).to.be.true;
    });

    button?.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
  });

  it('triggers the "click" event when the Space key is pressed', async () => {
    const callback = fake();
    const el = await fixture(html`<mnml-button @click=${callback}>Button</mnml-button> `);
    const button = el.shadowRoot?.querySelector("button");

    setTimeout(() => {
      expect(callback.called).to.be.true;
    });

    button?.dispatchEvent(new KeyboardEvent("keydown", { key: " " }));
  });
});
