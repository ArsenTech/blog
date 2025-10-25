import { SITE_URL } from "../constants";

export function getValueFromKey(searchParams: URLSearchParams, key: string, fallbackValue=""):string{
     const hasKey = searchParams.has(key);
     return hasKey ? searchParams.get(key)?.slice(0,100) ?? fallbackValue : fallbackValue
}
export const absoluteURL = (path: string) => `${SITE_URL}${path}`