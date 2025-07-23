<script>
    import { Button } from "$lib/components/ui/button";
    import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
</script>

<div class="min-h-screen bg-background flex items-center justify-center px-4">
    <div class="w-full max-w-md space-y-6">
        <div class="text-center space-y-2">
            <h1 class="text-4xl font-bold tracking-tight">🔒</h1>
            <h2 class="text-2xl font-semibold tracking-tight">Unauthorized</h2>
        </div>
        
        <Card>
            <CardHeader class="text-center">
                <CardTitle class="text-lg">Access Denied</CardTitle>
            </CardHeader>
            <CardContent class="space-y-4">
                <p class="text-sm text-muted-foreground text-center">
                    Please log in or sign up to use your awesome Almirah!
                </p>
                
                <div class="flex flex-col space-y-2">
                    <Button href="/login" class="w-full">
                        Login
                    </Button>
                    <Button href="/register" variant="outline" class="w-full">
                        Sign Up
                    </Button>
                </div>
            </CardContent>
        </Card>
    </div>
</div>