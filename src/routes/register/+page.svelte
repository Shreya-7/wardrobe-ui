<script lang="ts">
    import { redirect } from '@sveltejs/kit';
  import type { ActionData } from './$types';

  export let form: ActionData;
  
  if (form?.success) redirect(302, "/login");
</script>

<form method="POST" action="?/register">
  <div class="form-group">
    <label for="name">Name</label>
    <input type="name" name="name" class="form-control" id="name" aria-describedby="nameHelp" placeholder="Enter name">

    <small id="nameHelp" class="form-text text-muted">What do you call yourself?</small>
  </div>
    <div class="form-group">
      <label for="email_id">Email address</label>
      <input type="email" name="email_id" class="form-control" id="email_id" aria-describedby="emailHelp" placeholder="Enter email">

      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" class="form-control" name="password" id="password" placeholder="Password">
    </div>
    <!-- display error message -->
    {#if form?.errorMessage}
      <div class="alert alert-danger">{form.errorMessage}</div>
    {/if}
    <button type="submit" class="btn btn-primary">Register</button>    
</form>