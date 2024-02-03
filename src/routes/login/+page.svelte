<script lang="ts">
  import UserInfoForm from "$lib/components/UserInfoForm.svelte";
  import type { ActionData } from "./$types";

  export let form: ActionData;
</script>

<UserInfoForm
  actionName="Login"
  actionPath="login"
  additionalInfoRequired={false}
  errorMessage={form?.errorMessage}
></UserInfoForm>
