<script lang="ts">
    import Nav from "$lib/components/Nav.svelte";
    import "../app.css";
    
    export let data;
    $: user = data.user;
</script>

<div class="min-h-screen bg-background">
    <Nav user={user}/>
    <main class="flex-1">
        <slot />
    </main>
</div>