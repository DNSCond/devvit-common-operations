import { type TriggerContext } from "@devvit/public-api";

/* for this to work, insert this into your devvit.json

note, you should set `npx devvit settings set upgradeRequirer-semver-lowest-supported`
to the latest version when your app is approved for that version.
DO NOT SET IT AT THE `devvit publish` TIME (see code below).

{
  "settings": {
    "global": {
      "upgradeRequirer-semver-lowest-supported": {
        "type": "string",
        "label": "lowest-supported version in semi semver",
      }
    }
  }
}
*/

/**
 * call this method when checking if the app's current version is higher than the latest.
 * provide true to throw an RangeError (the default) if the version is not supported,
 * provide false to just return false.
 * 
 * also throws a TypeError in case "upgradeRequirer-semver-lowest-supported" is not a valid devvit version
 */
export async function isAppVersionSupported(context: TriggerContext, throwIfNotSupported = true): Promise<boolean | null> {
  const { settings } = context, lowestSupported = await settings.get<string>('upgradeRequirer-semver-lowest-supported');
  if (!lowestSupported) return null;

  const [lS_major, lS_minor, lS_patch, lS_playtest] = parseVersion(lowestSupported);
  const [cu_major, cu_minor, cu_patch, cu_playtest] = parseVersion(context.appVersion);

  // Compare in order: major → minor → patch → playtest
  const parts: [number, number][] = [
    [cu_major, lS_major],
    [cu_minor, lS_minor],
    [cu_patch, lS_patch],
    [cu_playtest || 0, lS_playtest || 0]
  ];

  for (const [cu, lS] of parts) {
    const cmp = comparitor(cu, lS);
    if (cmp > 0) return true;  // current is higher → supported
    if (cmp < 0) {
      if (throwIfNotSupported) {
        throw new RangeError(`version (${cu_major}.${cu_minor}.${cu_patch}.${cu_playtest}) is not supported by (${lS_major}.${lS_minor}.${lS_patch}.${lS_playtest})`);
      } else {
        return false; // current is lower → not supported
      }
    }
    // cmp === 0 → continue to next part
  }

  // All parts equal → version is exactly equal → supported
  return true;
}

function comparitor(le: number, ri: number) {
  if (isNaN(le) || isNaN(ri)) return NaN;
  le = +le; ri = +ri;
  if (le < ri) return -1;
  if (le > ri) return +1;
  if (le === ri) return 0;
  return NaN;
}

function parseVersion(ver: string) {
  const m = /(\d+)\.(\d+)\.(\d+)(?:\.(\d+))?/.exec(ver);
  if (!m) throw new TypeError('Invalid version: ' + ver);
  return m.slice(1).map(n => +n || 0); // defaults undefined playtest to 0
}
