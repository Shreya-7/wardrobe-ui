<script lang="ts">
  import type { ActionData } from "./$types";
  import UserInfoForm from "$lib/components/UserInfoForm.svelte";

  export let form: ActionData;
  
</script>

<UserInfoForm
  errorMessage={form?.errorMessage}
  actionName="Register"
  actionPath="register"
  additionalInfoRequired={true}
></UserInfoForm>
