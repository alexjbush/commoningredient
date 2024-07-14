<script context="module" lang="ts">
    export const HeadingPage = ["Home", "Recipes", "Ingredients"] as const;
    export type HeadingPage = (typeof HeadingPage)[number];
</script>

<script lang="ts">
    import CircleUser from "lucide-svelte/icons/circle-user";
    import Menu from "lucide-svelte/icons/menu";
    import ChefHat from "lucide-svelte/icons/chef-hat";
    import Search from "lucide-svelte/icons/search";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Checkbox } from "$lib/components/ui/checkbox/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import * as Sheet from "$lib/components/ui/sheet/index.js";
    import { get } from "svelte/store";
    import { getContext } from "svelte";
    import type { Phrases } from "$lib/languages/types";

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
        <form class="ml-auto flex-1 sm:flex-initial">
            <div class="relative">
                <Search
                    class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
                />
                <Input
                    type="search"
                    placeholder="Search products..."
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
