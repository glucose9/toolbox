import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  const main = (await import(`../messages/${locale}.json`)).default;
  const toolMeta = (await import(`../messages/tool-meta-${locale}.json`)).default;
  return {
    locale,
    messages: { ...main, toolMeta },
  };
});
