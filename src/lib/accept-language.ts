const regex: RegExp = /((([a-zA-Z]+(-[a-zA-Z0-9]+){0,2})|\*)(;q=[0-1](\.[0-9]+)?)?)*/g;

export interface AcceptLanguageLocale {
    code: string;
    script: string | null;
    region: string | null;
    quality: number;
}

export function parseAcceptLanguage(al: string | null): AcceptLanguageLocale[] {
    let strings: RegExpMatchArray | null = (al || "").match(regex);
    if (!strings) {
        return [];
    }
    let mapped = strings.map((m: string) => {

        const bits = m.split(';');
        const ietf = bits[0].split('-');
        const hasScript = ietf.length === 3;

        return {
            code: ietf[0],
            script: hasScript ? ietf[1] : null,
            region: hasScript ? ietf[2] : ietf[1],
            quality: bits[1] ? parseFloat(bits[1].split('=')[1]) : 1.0
        };
    })
    let sorted = mapped.sort((a: AcceptLanguageLocale, b: AcceptLanguageLocale): number => b.quality - a.quality);
    return sorted;
}