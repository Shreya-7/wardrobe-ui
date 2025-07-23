<script lang="ts">
    export let label: string;
    export let value: string | null | undefined;
    export let fullWidth: boolean = false;
</script>

{#if value}
    <div class={fullWidth ? "" : ""}>
        <dt class="text-sm font-medium text-muted-foreground{fullWidth ? ' mb-2' : ''}">{label}</dt>
        <dd class="text-sm">{value}</dd>
    </div>
{/if} 