import { v as pop, t as push, w as slot } from "../../chunks/index.js";
import "clsx";
function Header($$payload, $$props) {
  push();
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]-->`);
  pop();
}
function _layout($$payload, $$props) {
  $$payload.out.push(`<div class="min-h-screen bg-black flex flex-col">`);
  Header($$payload);
  $$payload.out.push(`<!----> <main><!---->`);
  slot($$payload, $$props, "default", {});
  $$payload.out.push(`<!----></main></div>`);
}
export {
  _layout as default
};
