<script lang="ts">
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
    import { getContext, setContext } from "svelte";
    let setHeadingPage: (_: HeadingPage) => void = getContext("setHeadingPage");
    setHeadingPage("Home");
</script>

<div class="mx-auto grid w-full max-w-6xl gap-2">
    <h1 class="text-3xl font-semibold">Settings</h1>
</div>
<div
    class="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]"
>
    <nav
        class="grid gap-4 text-sm text-muted-foreground"
        data-x-chunk-name="dashboard-04-chunk-0"
        data-x-chunk-description="A sidebar navigation with links to general, security, integrations, support, organizations, and advanced settings."
        data-x-chunk-container="chunk-container after:right-0"
    >
        <a href="##" class="font-semibold text-primary"> General </a>
        <a href="##">Security</a>
        <a href="##">Integrations</a>
        <a href="##">Support</a>
        <a href="##">Organizations</a>
        <a href="##">Advanced</a>
    </nav>
    <div class="grid gap-6">
        <Card.Root
            data-x-chunk-name="dashboard-04-chunk-1"
            data-x-chunk-description="A form to update the store name."
        >
            <Card.Header>
                <Card.Title>Store Name</Card.Title>
                <Card.Description>
                    Used to identify your store in the marketplace.
                </Card.Description>
            </Card.Header>
            <Card.Content>
                <form>
                    <Input placeholder="Store Name" />
                </form>
            </Card.Content>
            <Card.Footer class="border-t px-6 py-4">
                <Button>Save</Button>
            </Card.Footer>
        </Card.Root>
        <Card.Root
            data-x-chunk-name="dashboard-04-chunk-2"
            data-x-chunk-description="A form to update the plugins directory with a checkbox to allow administrators to change the directory."
        >
            <Card.Header>
                <Card.Title>Plugins Directory</Card.Title>
                <Card.Description>
                    The directory within your project, in which your plugins are
                    located.
                </Card.Description>
            </Card.Header>
            <Card.Content>
                <form class="flex flex-col gap-4">
                    <Input
                        placeholder="Project Name"
                        value="/content/plugins"
                    />
                    <div class="flex items-center space-x-2">
                        <Checkbox id="include" checked={true} />
                        <label
                            for="include"
                            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Allow administrators to change the directory.
                        </label>
                    </div>
                </form>
            </Card.Content>
            <Card.Footer class="border-t px-6 py-4">
                <Button>Save</Button>
            </Card.Footer>
        </Card.Root>
    </div>
</div>
