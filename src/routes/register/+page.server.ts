import { AuthenticationService, OpenAPI, type AuthLoginPostRequest, ApiError, type AuthRegisterPostRequest } from "../../client"
import type { Actions, RequestEvent } from "./$types";
import { fail, redirect } from "@sveltejs/kit";

let error: Boolean = false;

export const actions: Actions = {
    register: async ({ request }) => {
        const data = await request.formData();
        const email_id = data.get('email_id')?.toString();
        const password = data.get('password')?.toString();
        const name = data.get('name')?.toString();
        if(!name || !email_id || !password) 
            return fail(400, {errorMessage: "Whats up with your name?"})
        const registerRequest: AuthRegisterPostRequest = {name, email_id, password};
        try {
            await AuthenticationService.authRegisterPostAuthRegisterPost(registerRequest);
            return {success: true}
        } catch (err) {
            const apiError = err as ApiError
            return fail(apiError.status, { errorMessage: apiError.message})
        }
    }
}