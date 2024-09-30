<script lang="ts">
    import Nav from "$lib/components/Nav.svelte";
    import { page } from '$app/stores';
    $: user = $page.data.user;
</script>
<Nav user={user}/>
<div class="p-3">
    <slot />
</div>