import type { HeadingPage } from "$lib/components/header/header.svelte";
import type { LanguageCode } from "$lib/types";

export interface Phrases {
    CreateNewRecipeDescription: string;
    CreateNewRecipe: string;
    searchRecipes: string;
    language: LanguageCode;
    region: string;
    headingPageTitle: (_: HeadingPage) => string;
    NoResultsFound(): string;
    toggleNavigationMenu: string
    siteName: string
}