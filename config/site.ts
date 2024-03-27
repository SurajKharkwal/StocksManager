export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Stock-Manager",
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
    {
      label: "Salesmen",
      href: "/salesmen"
    }
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
      label: "Salesmen",
      href: "/salesmen"
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  links: {
    github: "https://github.com/SurajKharkwal",
    twitter: "https://twitter.com/getnextui",
    discord: "https://discord.gg/9b6yyZKmH4",
  },
};
