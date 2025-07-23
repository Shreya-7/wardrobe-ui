<script lang="ts">
    import type { User } from "../../client";
    import { Button } from "$lib/components/ui/button";
    import { Badge } from "$lib/components/ui/badge";
    import { Separator } from "$lib/components/ui/separator";

    export let user: User | undefined;
</script>

<nav class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container flex h-16 items-center px-4">
        <div class="flex items-center">
            <a href="/" class="text-xl font-semibold text-primary hover:text-primary/80 transition-colors">
                Almirah
            </a>
        </div>
        
        <div class="flex-1 flex justify-center mx-4">
            <div class="hidden md:flex">
                <a href="/items" class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1">
                    Items
                </a>
            </div>
        </div>
        
        <div class="flex items-center space-x-4 flex-shrink-0">
            {#if user}
                <Badge variant="outline">{user.name}</Badge>
                <a href="/logout" class="flex-shrink-0">
                    <Button variant="ghost" size="sm">
                        Logout
                    </Button>
                </a>
            {:else}
                <Button href="/login" variant="default" size="sm">
                    Login
                </Button>
            {/if}
        </div>
    </div>

    <div class="border-t md:hidden">
        <div class="container flex h-12 items-center px-4">
            <div class="flex items-center space-x-4">
                <a href="/items" class="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1">
                    Items
                </a>
            </div>
        </div>
    </div>
</nav>
