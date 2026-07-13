// When navigating from the open fullscreen NavMenu, the menu covers the
// whole swap — skip the page transition so the new page is ready the
// moment the menu fades out. Navbar/other navigations keep the default.
export default defineNuxtRouteMiddleware((to) => {
  if (!import.meta.client) return;
  const menuOpen = useState<boolean>("toggleMenu", () => false).value;
  // "menu-swap" has no CSS → instant swap, but keeps the <Transition>
  // wrapper mounted (pageTransition: false would remove it and break the
  // enter animation of the following navigation).
  to.meta.pageTransition = menuOpen
    ? { name: "menu-swap", mode: "out-in" }
    : undefined;
});
