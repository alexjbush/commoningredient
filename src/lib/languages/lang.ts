import { invalidate } from "$app/navigation";
import { writable } from "svelte/store";
import { LanguageCode, type Locale } from "../types";
import type { AcceptLanguageLocale } from "../accept-language";
import { assertUnreachable } from "../utils";
import type { Phrases } from "./types";
import { EnPhrases } from "./en/en";
import { EnGBPhrases } from "./en/en-GB";
import { EnUSPhrases } from "./en/en-US";

const DefaultLocale: Locale = {
    language: LanguageCode.Enum.en,
    region: "US",
}

function defaultRegionForLanguage(language: LanguageCode): string {
    switch (language) {
        case LanguageCode.Enum.en:
            return "US";
        default:
            return assertUnreachable(language);
    }
}

function getNextBestRegionForLocale(lang: LanguageCode, region: string): string {
    switch (lang) {
        case LanguageCode.Enum.en:
            switch (region) {
                case "NZ":
                    return "GB";
                case "AU":
                    return "GB";
                default:
                    return defaultRegionForLanguage(lang);
            }
        default:
            return assertUnreachable(lang);
    }
}

export function getRegionPreferencesForLocale(locale: Locale): [string, ...string[]] {
    let region = locale.region;
    let preferences: string[] = []
    while (true) {
        let nextBestRegion = getNextBestRegionForLocale(locale.language, region);
        if (nextBestRegion === locale.region || preferences.includes(nextBestRegion)) {
            break;
        }
        preferences.push(nextBestRegion);
        region = nextBestRegion;
    }
    return [locale.region, ...preferences];
}

export function getBestLocale(acceptLanguage: AcceptLanguageLocale | null): Locale {
    let lang = LanguageCode.safeParse(acceptLanguage?.code);
    if (lang.success) {
        return {
            language: lang.data,
            region: acceptLanguage?.region ?? defaultRegionForLanguage(lang.data),
        }
    } else {
        return DefaultLocale;
    }
}

export function getPhrases(locale: Locale): Phrases {
    let preferences = getRegionPreferencesForLocale(locale);
    switch (locale.language) {
        case LanguageCode.Enum.en:
            let defaultPhrases = new EnUSPhrases();
            for (let region of preferences) {
                switch (region) {
                    case "GB":
                        return new EnGBPhrases();
                    case "US":
                        return new EnUSPhrases();
                }
            }
            return defaultPhrases;
        default:
            return assertUnreachable(locale.language);
    }
}