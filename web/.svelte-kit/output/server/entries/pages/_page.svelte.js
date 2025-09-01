import { z as attr_class, v as pop, t as push, F as stringify } from "../../chunks/index.js";
function _page($$payload, $$props) {
  push();
  let primaryBg, secondaryBg, tertiaryBg, primaryText, secondaryText, buttonHoverBg, buttonHoverText, buttonBorder;
  primaryBg = "bg-black";
  secondaryBg = "bg-neutral-900";
  tertiaryBg = "bg-black";
  primaryText = "text-white";
  secondaryText = "text-neutral-300";
  buttonHoverBg = "hover:bg-white";
  buttonHoverText = "hover:text-black";
  buttonBorder = "border-white";
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--> <section${attr_class(`welcome-section ${stringify(primaryBg)} min-h-screen flex flex-col items-center justify-center p-8 relative`)}>`);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--> `);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--> `);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--> `);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--></section> <section${attr_class(`min-h-screen ${stringify(secondaryBg)} p-8 pt-20`)}><div class="max-w-4xl mx-auto text-center"><h2${attr_class(`text-3xl md:text-4xl font-bold ${stringify(primaryText)} mb-8`)} id="about">About Me</h2> <p${attr_class(`${stringify(primaryText)} text-lg leading-relaxed`)}>Your about content goes here...</p></div></section> <section${attr_class(`py-40 ${stringify(tertiaryBg)}`)}><div class="max-w-4xl mx-auto text-center px-8"><h2${attr_class(`text-3xl md:text-4xl font-bold ${stringify(primaryText)} mb-6`)} id="projects">Things I've Done</h2> <p${attr_class(`text-lg ${stringify(secondaryText)} mb-8`)}>I can't promise much from this</p> <button${attr_class(`group relative ${stringify(primaryText)} border-2 ${stringify(buttonBorder)} px-6 py-3 rounded-lg ${stringify(buttonHoverBg)} ${stringify(buttonHoverText)} transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto`)}><span class="text-lg font-medium">Explore All Projects</span> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg></button></div></section> <section${attr_class(`py-40 ${stringify(secondaryBg)}`)}><div class="max-w-4xl mx-auto text-center px-8"><h2${attr_class(`text-3xl md:text-4xl font-bold ${stringify(primaryText)} mb-6`)} id="blog">I Write Here Sometimes</h2> <p${attr_class(`text-lg ${stringify(secondaryText)} mb-8`)}>I try write whats on my mind sometimes... I can't promise its any good</p> <button${attr_class(`group relative ${stringify(primaryText)} border-2 ${stringify(buttonBorder)} px-6 py-3 rounded-lg ${stringify(buttonHoverBg)} ${stringify(buttonHoverText)} transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto`)}><span class="text-lg font-medium">Read My Posts</span> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg></button></div></section>`);
  pop();
}
export {
  _page as default
};
