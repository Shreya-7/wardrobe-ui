<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
    import { Separator } from "$lib/components/ui/separator";

    export let errorMessage: string | undefined,
        actionName: string,
        actionPath: string,
        additionalInfoRequired: boolean;
</script>

<div class="min-h-screen flex items-center justify-center bg-muted/50 px-4">
    <Card class="w-full max-w-md">
        <CardHeader class="space-y-1">
            <CardTitle class="text-2xl font-semibold text-center">
                {actionName}
            </CardTitle>
        </CardHeader>
        
        <CardContent>
            <form method="POST" action="?/{actionPath}" class="space-y-4">
                {#if additionalInfoRequired}
                    <div class="space-y-2">
                        <Label for="name" class="text-sm font-medium">Name</Label>
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Your name"
                            required
                        />
                    </div>
                {/if}

                <div class="space-y-2">
                    <Label for="email_id" class="text-sm font-medium">Email</Label>
                    <Input
                        type="email"
                        name="email_id"
                        id="email_id"
                        placeholder="Email address"
                        required
                    />
                </div>

                <div class="space-y-2">
                    <Label for="password" class="text-sm font-medium">Password</Label>
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        required
                    />
                </div>

                {#if errorMessage}
                    <div class="rounded-md border border-destructive/50 bg-destructive/10 p-3">
                        <p class="text-sm text-destructive">{errorMessage}</p>
                    </div>
                {/if}

                <Button type="submit" class="w-full" size="lg">
                    {actionName}
                </Button>
            </form>

            <div class="mt-6">
                <Separator />
                <div class="mt-4 text-center text-sm text-muted-foreground">
                    {#if actionName === "Login"}
                        Don't have an account? 
                        <a href="/register" class="font-medium text-primary hover:text-primary/80 transition-colors">
                            Sign up
                        </a>
                    {:else}
                        Already have an account? 
                        <a href="/login" class="font-medium text-primary hover:text-primary/80 transition-colors">
                            Sign in
                        </a>
                    {/if}
                </div>
            </div>
        </CardContent>
    </Card>
</div>
