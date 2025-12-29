import createMiddleware from "next-intl/middleware";
import { locales } from "./lib/i18n";

export default createMiddleware({
  locales,

  defaultLocale: "vi",
});

export const config = {
  matcher: ["/", "/(vi|en)/:path*"],
};
