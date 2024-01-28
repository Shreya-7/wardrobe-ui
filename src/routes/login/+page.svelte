<script lang="ts">
  import type { ActionData } from './$types';

  export let form: ActionData;
</script>

<form method="POST" action="?/login">
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
    <button type="submit" class="btn btn-primary">Submit</button>    
    <small id="loginHelp" class="form-text text-muted">New here? <a href="/register">Register!</a></small>
</form>