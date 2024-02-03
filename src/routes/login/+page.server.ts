import { AuthenticationService, OpenAPI, type AuthLoginPostRequest, ApiError } from "../../client"
import type { Actions, RequestEvent } from "./$types"
import { goto } from "$app/navigation";
import { fail, redirect } from "@sveltejs/kit";

let error: Boolean = false;

export const actions: Actions = {
    login: async ({ cookies, request }) => {
        error = false;
        const data = await request.formData();
        const email_id = data.get('email_id')?.toString();
        const password = data.get('password')?.toString();
        const loginRequest: AuthLoginPostRequest = {email_id, password};
        try {
            const loginResp = await AuthenticationService.authLoginPostAuthLoginPost(loginRequest);            
            cookies.set('accessToken', loginResp);
        } catch (err) {
            const apiError = err as ApiError
            return fail(apiError.status, { errorMessage: apiError.message})
        }
        throw redirect(302, "/");
    }
}