const webappDomainRegex =
  /^https?:\/\/(?:webapp(?:qa|int)\.fromdoppler\.net|app\.fromdoppler\.com)(?=\/|$)/;
const applyUrlPatchInTheseDomainsRegex =
  /^https?:\/\/(?:testmenu(?:qa|int)\.fromdoppler\.net|testmenu\.fromdoppler\.com|localhost:3000)(?=\/|$)/;

const shouldApplyPatch = applyUrlPatchInTheseDomainsRegex.test(
  window.location.origin,
);

export const patchWebAppUrlIfNeed: (url: string) => string = shouldApplyPatch
  ? (url) => url.replace(webappDomainRegex, origin)
  : (url) => url;
