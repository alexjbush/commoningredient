<script context="module" lang="ts">
    export const HeadingPage = ["Home", "Recipes", "Ingredients"] as const;
    export type HeadingPage = (typeof HeadingPage)[number];
</script>

<script lang="ts">
    import CircleUser from "lucide-svelte/icons/circle-user";
    import Menu from "lucide-svelte/icons/menu";
    import ChefHat from "lucide-svelte/icons/chef-hat";
    import Search from "lucide-svelte/icons/search";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Checkbox } from "$lib/components/ui/checkbox/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import * as Sheet from "$lib/components/ui/sheet/index.js";
    import { get } from "svelte/store";
    import { getContext } from "svelte";
    import FileX2 from "lucide-svelte/icons/file-plus-2";
    import Pen from "lucide-svelte/icons/pen";
    import ImagePlus from "lucide-svelte/icons/image-plus";
    import Globe from "lucide-svelte/icons/globe";
    import type { Phrases } from "$lib/languages/types";
    import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import * as RadioGroup from "../ui/radio-group";
    export let headingPage: HeadingPage | null;
    let createRecipeRadioValue: "scratch" | "images" | "website" = "scratch";
    let createRecipePage: "landing" | "from-images" = "landing";

    let phrases: Phrases = getContext("phrases");
</script>

<header
    class="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6"
>
    <nav
        class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6"
    >
        <a
            href="##"
            class="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
            <ChefHat class="h-6 w-6" />
            <span class="sr-only">{phrases.siteName}</span>
        </a>
        {#each Object.values(HeadingPage) as page}
            <a
                href="##"
                class="transition-colors hover:text-foreground"
                class:text-foreground={headingPage === page}
                class:text-muted-foreground={headingPage !== page}
            >
                {phrases.headingPageTitle(page)}
            </a>
        {/each}
    </nav>
    <Sheet.Root>
        <Sheet.Trigger asChild let:builder>
            <Button
                variant="outline"
                size="icon"
                class="shrink-0 md:hidden"
                builders={[builder]}
            >
                <Menu class="h-5 w-5" />
                <span class="sr-only">{phrases.toggleNavigationMenu}</span>
            </Button>
        </Sheet.Trigger>
        <Sheet.Content side="left">
            <nav class="grid gap-6 text-lg font-medium">
                <a
                    href="##"
                    class="flex items-center gap-2 text-lg font-semibold"
                >
                    <ChefHat class="h-6 w-6" />
                    <span class="sr-only">{phrases.siteName}</span>
                </a>
                {#each HeadingPage as page}
                    <a
                        href="##"
                        class="hover:text-foreground"
                        class:text-foreground={headingPage === page}
                        class:text-muted-foreground={headingPage !== page}
                    >
                        {phrases.headingPageTitle(page)}
                    </a>
                {/each}
            </nav>
        </Sheet.Content>
    </Sheet.Root>
    <div class="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <Dialog.Root
            onOpenChange={() => {
                createRecipeRadioValue = "scratch";
                createRecipePage = "landing";
            }}
        >
            <Dialog.Trigger
                class={buttonVariants({
                    variant: "default",
                    size: { initial: "icon", sm: "default" },
                })}
            >
                <FileX2 class="sm:mr-2 h-5 w-5" />
                <span class="hidden sm:block">{phrases.CreateNewRecipe}</span>
            </Dialog.Trigger>
            <Dialog.Content class="sm:max-w-[425px]">
                <Dialog.Header>
                    <Dialog.Title>{phrases.CreateNewRecipe}</Dialog.Title>
                    <Dialog.Description>
                        {phrases.CreateNewRecipeDescription}
                    </Dialog.Description>
                </Dialog.Header>
                <div class="flex flex-col gap-2">
                    {#if createRecipePage === "landing"}
                        <RadioGroup.Root
                            bind:value={createRecipeRadioValue}
                            class="grid gap-1"
                        >
                            <Label
                                for="scratch"
                                class="[&:has([data-disabled=true])]:bg-accent [&:has([data-disabled=true])]:text-muted-foreground [&:has([data-disabled=true])]:cursor-not-allowed border-muted bg-popover hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary flex items-start space-x-4 rounded-md border-2 p-2"
                            >
                                <RadioGroup.Item
                                    value="scratch"
                                    id="scratch"
                                    class="sr-only"
                                    aria-label="From scratch"
                                />
                                <Pen class="mt-px h-5 w-5" />
                                <div class="space-y-1">
                                    <p
                                        class="text-base font-medium leading-none"
                                    >
                                        {phrases.FromScratch}
                                    </p>
                                    <p class="text-muted-foreground text-sm">
                                        {phrases.FromScratchDescription}
                                    </p>
                                </div>
                            </Label>
                            <Label
                                for="images"
                                class="[&:has([data-disabled=true])]:bg-accent [&:has([data-disabled=true])]:text-muted-foreground [&:has([data-disabled=true])]:cursor-not-allowed border-muted bg-popover hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary flex items-start space-x-4 rounded-md border-2 p-2"
                            >
                                <RadioGroup.Item
                                    value="images"
                                    id="images"
                                    class="sr-only"
                                    aria-label="From images or documents"
                                />
                                <ImagePlus class="mt-px h-5 w-5" />
                                <div class="space-y-1">
                                    <p
                                        class="text-base font-medium leading-none"
                                    >
                                        {phrases.FromImages}
                                    </p>
                                    <p class="text-muted-foreground text-sm">
                                        {phrases.FromImagesDescription}
                                    </p>
                                </div>
                            </Label>
                            <Label
                                for="website"
                                class="[&:has([data-disabled=true])]:bg-accent [&:has([data-disabled=true])]:text-muted-foreground [&:has([data-disabled=true])]:cursor-not-allowed border-muted bg-popover hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary flex items-start space-x-4 rounded-md border-2 p-2"
                            >
                                <RadioGroup.Item
                                    value="website"
                                    id="website"
                                    class="sr-only"
                                    aria-label="From website"
                                    disabled={true}
                                />
                                <Globe class="mt-px h-5 w-5" />

                                <div class="space-y-1">
                                    <p
                                        class="text-base font-medium leading-none"
                                    >
                                        {phrases.FromWebsite}
                                    </p>
                                    <p class="text-muted-foreground text-sm">
                                        {phrases.FromWebsiteDescription}
                                    </p>
                                </div>
                            </Label>
                        </RadioGroup.Root>
                    {:else if createRecipePage === "from-images"}
                        Images
                    {/if}
                </div>
                <Dialog.Footer>
                    {#if createRecipePage === "landing"}
                        {#if createRecipeRadioValue === "scratch"}
                            <Button type="button">
                                {phrases.LetsGo}
                            </Button>
                        {:else if createRecipeRadioValue === "images"}
                            <Button
                                type="button"
                                on:click={() => {
                                    createRecipePage = "from-images";
                                }}
                            >
                                {phrases.Next}
                            </Button>
                        {/if}
                    {:else}
                        <div class="flex justify-between w-full">
                            <Button
                                type="button"
                                variant="outline"
                                on:click={() => {
                                    createRecipePage = "landing";
                                }}
                            >
                                {phrases.Back}
                            </Button>

                            <Button
                                type="button"
                                on:click={() => {
                                    createRecipePage = "from-images";
                                }}
                            >
                                {phrases.LetsGo}
                            </Button>
                        </div>
                    {/if}
                </Dialog.Footer>
            </Dialog.Content>
        </Dialog.Root>
        <form class="ml-auto flex-1 sm:flex-initial">
            <div class="relative">
                <Search
                    class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
                />
                <Input
                    type="search"
                    placeholder={phrases.searchRecipes}
                    class="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                />
            </div>
        </form>
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild let:builder>
                <Button
                    builders={[builder]}
                    variant="secondary"
                    size="icon"
                    class="rounded-full"
                >
                    <CircleUser class="h-5 w-5" />
                    <span class="sr-only">Toggle user menu</span>
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end">
                <DropdownMenu.Label>My Account</DropdownMenu.Label>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>Settings</DropdownMenu.Item>
                <DropdownMenu.Item>Support</DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>Logout</DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    </div>
</header>
