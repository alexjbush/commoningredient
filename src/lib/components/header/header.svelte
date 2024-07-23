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
    import type { Phrases } from "$lib/languages/types";
    import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    export let headingPage: HeadingPage | null;

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
        <Dialog.Root>
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
                <div class="grid gap-4 py-4">
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="name" class="text-right">Name</Label>
                        <Input
                            id="name"
                            value="Pedro Duarte"
                            class="col-span-3"
                        />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="username" class="text-right">Username</Label
                        >
                        <Input
                            id="username"
                            value="@peduarte"
                            class="col-span-3"
                        />
                    </div>
                </div>
                <Dialog.Footer>
                    <Button type="submit">Save changes</Button>
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
