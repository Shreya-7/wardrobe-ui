<script lang="ts">
    import type { User } from "../../client";

    export let user: User | undefined;
</script>

<nav
    class="navbar navbar-expand-lg navbar-light"
    style="background-color: #e3f2fd;"
>
    <a class="navbar-brand" href="/">Almirah</a>
    <button class="navbar-toggler align-center" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <a class="nav-link" href="/"
                    >Home <span class="sr-only">(current)</span></a
                >
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/items">Items</a>
            </li>
            {#if user}
                <li class="nav-item active">
                    <a href="/" class="nav-link">Hi {user.name}</a>
                </li>
                <li class="nav-item active">
                    <a href="/logout" class="nav-link">Logout</a>
                </li>
            {:else}
                <li class="nav-item active">
                    <a href="/login" class="nav-link">Login</a>
                </li>
            {/if}
        </ul>
    </div>
</nav>
