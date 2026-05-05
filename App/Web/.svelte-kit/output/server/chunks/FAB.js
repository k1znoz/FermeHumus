import { d as escape_html } from "./renderer.js";
import "clsx";
function FAB($$renderer, $$props) {
  let { count = 0 } = $$props;
  $$renderer.push(`<button class="fixed bottom-6 right-6 w-14 h-14 bg-secondary text-on-secondary rounded-full flex items-center justify-center shadow-xl z-40 active:scale-95 transition-transform hover:scale-105" aria-label="Mon panier"><span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">shopping_basket</span> `);
  if (count > 0) {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<span class="absolute -top-1 -right-1 bg-primary text-on-primary text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">${escape_html(count)}</span>`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--></button>`);
}
export {
  FAB as F
};
