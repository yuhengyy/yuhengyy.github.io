import type { ExpressiveCodeConfig, LicenseConfig, NavBarConfig, ProfileConfig, SiteConfig } from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
  title: "羽痕的小站",
  subtitle: "把好奇心，写成日常。",
  lang: "zh_CN",
  themeColor: { hue: 155, fixed: true },
  banner: {
    enable: true,
    src: "/brand/landscape.svg",
    position: "center",
    credit: { enable: false, text: "", url: "" },
  },
  toc: { enable: true, depth: 2 },
  favicon: [{ src: "/brand/leaf.svg" }],
};

export const navBarConfig: NavBarConfig = {
  links: [LinkPreset.Home, { name: "文章", url: "/archive/" }, LinkPreset.About],
};

export const profileConfig: ProfileConfig = {
  avatar: "/brand/avatar.svg",
  name: "Yuhengyy",
  bio: "学习 Unity 与 C#，记录实践、思考和沿途的小发现。",
  links: [
    { name: "GitHub", icon: "fa6-brands:github", url: "https://github.com/yuhengyy" },
    { name: "B 站", icon: "fa6-brands:bilibili", url: "https://space.bilibili.com/3546742316337695" },
  ],
};

// The upstream MIT license covers the theme. No new license is assigned to the author's articles.
export const licenseConfig: LicenseConfig = { enable: false, name: "", url: "" };
export const expressiveCodeConfig: ExpressiveCodeConfig = { theme: "github-dark" };
