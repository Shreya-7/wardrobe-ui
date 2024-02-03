<script lang="ts">
    import { redirect } from "@sveltejs/kit";

    export let errorMessage: string | undefined,
        actionName: string,
        actionPath: string,
        additionalInfoRequired: boolean;

</script>

<form method="POST" action="?/{actionPath}">
    {#if additionalInfoRequired}
    <div class="form-group">
        <label for="name">Name</label>
        <input
            type="name"
            name="name"
            class="form-control"
            id="name"
            aria-describedby="nameHelp"
            placeholder="Enter name"
        />

        <small id="nameHelp" class="form-text text-muted"
            >What do you call yourself?</small
        >
    </div>
    {/if}
    <div class="form-group">
        <label for="email_id">Email address</label>
        <input
            type="email"
            name="email_id"
            class="form-control"
            id="email_id"
            aria-describedby="emailHelp"
            placeholder="Enter email"
        />

        <small id="emailHelp" class="form-text text-muted"
            >We'll never share your email with anyone else.</small
        >
    </div>
    <div class="form-group">
        <label for="password">Password</label>
        <input
            type="password"
            class="form-control"
            name="password"
            id="password"
            placeholder="Password"
        />
    </div>
    {#if errorMessage}
        <div class="alert alert-danger">{errorMessage}</div>
    {/if}
    <button type="submit" class="btn btn-primary">{actionName}</button>
</form>
