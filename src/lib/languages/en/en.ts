import { HeadingPage } from "$lib/components/header/header.svelte";
import { LanguageCode } from "$lib/types";
import { assertUnreachable } from "$lib/utils";
import type { Phrases } from "../types";

export abstract class EnPhrases implements Phrases {
    siteName: string = "CommonIngredient";
    toggleNavigationMenu: string = "Toggle navigation menu";
    headingPageTitle: (_: HeadingPage) => string = (page) => {
        switch (page) {
            case "Home":
                return "Home";
            case "Recipes":
                return "Recipes";
            case "Ingredients":
                return "Ingredients";
            default:
                return assertUnreachable(page);
        }
    }
    language: LanguageCode = LanguageCode.Enum.en;
    abstract region: string;

    

    NoResultsFound() {
        return "No results found";
    }
}