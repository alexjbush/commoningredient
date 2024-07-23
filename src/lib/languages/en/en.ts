import { HeadingPage } from "$lib/components/header/header.svelte";
import { LanguageCode } from "$lib/types";
import { assertUnreachable } from "$lib/utils";
import type { Phrases } from "../types";

export abstract class EnPhrases implements Phrases {
    FromWebsite: string = "From website";
    FromWebsiteDescription: string = "Import your favorite recipes from around the web.";
    FromImages: string = "From images";
    FromImagesDescription: string = "Import your favorite recipe from an image or document.";
    FromScratchDescription: string = "Start from a completely blank page to create a truly unique recipe.";
    FromScratch: string = "From scratch";
    CreateNewRecipeDescription: string = "Create a new recipe by choosing one of the following options to get started.";
    CreateNewRecipe: string = "Create new recipe";
    searchRecipes: string = "Search recipes...";
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