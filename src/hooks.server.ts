import { dev } from "$app/environment";
import { parseAcceptLanguage } from "$lib/accept-language";
import { getBestLocale } from "$lib/languages/lang";
import { UserPreference } from "$lib/types";
import { error } from "@sveltejs/kit";

export async function handle({ event, resolve }) {
    const { cookies, locals, request } = event

    locals.user = null;

    const session = cookies.get('session')
    if (session) {
        //TODO preference set in user profile
        locals.user = null;
    }

    if (!locals.userPreference) {
        const preferenceBase64 = cookies.get('user-preference')
        if (preferenceBase64) {
            const preferenceJsonString = atob(preferenceBase64)
            const preference = UserPreference.safeParse(JSON.parse(preferenceJsonString))
            if (preference.success) {
                locals.userPreference = preference.data;
            } else {
                cookies.delete('user-preference', { path: '/' })
            }
        }
    }

    if (!locals.userPreference) {
        let acceptLanguageHeader = event.request.headers.get('Accept-Language')
        let acceptLanguageArray = parseAcceptLanguage(acceptLanguageHeader);
        let acceptLanguage = acceptLanguageArray.length > 0 ? acceptLanguageArray[0] : null;
        locals.userPreference = {
            locale: getBestLocale(acceptLanguage)
        }
    }

    const response = await resolve(event);
    return response;
}