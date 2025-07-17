import { AuthenticationService, type AuthLoginPostRequest, ApiError } from "../../../client"
import type { Actions } from "./$types"
import { fail, redirect } from "@sveltejs/kit";
import { ACCESS_TOKEN } from "../../../constants";

export const actions: Actions = {
    login: async ({ cookies, request }) => {
        const data = await request.formData();
        const email_id = data.get('email_id')?.toString();
        const password = data.get('password')?.toString();
        const loginRequest: AuthLoginPostRequest = { email_id, password };
        try {
            const loginResp = await AuthenticationService.authLoginPostAuthLoginPost(loginRequest);
            console.log(JSON.stringify(loginResp));
            cookies.set(ACCESS_TOKEN, loginResp, {secure: false});
        } catch (err) {
            const apiError = err as ApiError
            return fail(apiError.status, { errorMessage: apiError.message })
        }
        throw redirect(302, "/");
    }
}