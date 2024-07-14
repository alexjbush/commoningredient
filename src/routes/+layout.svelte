<script lang="ts">
    import "../app.css";

    import CircleUser from "lucide-svelte/icons/circle-user";
    import Menu from "lucide-svelte/icons/menu";
    import Package2 from "lucide-svelte/icons/package-2";
    import Search from "lucide-svelte/icons/search";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Checkbox } from "$lib/components/ui/checkbox/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import * as Sheet from "$lib/components/ui/sheet/index.js";
    import Header, { HeadingPage } from "$lib/components/header/header.svelte";
    import {
        readable,
        writable,
        type Readable,
        type Writable,
    } from "svelte/store";
    import { setContext } from "svelte";
    import { getPhrases } from "$lib/languages/lang";

    export let data;

    setContext("locale", data.userPreference.locale);
    setContext("phrases", getPhrases(data.userPreference.locale));

    let headingPage: Writable<HeadingPage | null> = writable(null);

    setContext("setHeadingPage", (page: HeadingPage) => {
        headingPage.set(page);
    });
</script>

<div class="flex min-h-screen w-full flex-col">
    <Header headingPage={$headingPage}></Header>
    <main
        class="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10"
    >
        <slot></slot>
    </main>
</div>
