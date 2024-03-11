export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Stock-manager",
  description: "A website that aims to automate stoks of any shop .",
  navItems: [
    {
      label: "Dashboard",
      href: "/manager/dashboard",
    },
    {
      label: "Inventory",
      href: "/manager/inventory",
    },
    {
      label: "Gen-Barcode",
      href: "/manager/gen-barcode",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Dashboard",
      href: "/manager/dashboard",
    },
    {
      label: "Inventory",
      href: "/manager/inventory",
    },
    {
      label: "Gen-Barcode",
      href: "/manager/gen-barcode",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
