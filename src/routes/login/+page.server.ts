import { AuthenticationService, OpenAPI, type AuthLoginPostRequest, ApiError, UsersService } from "../../client"
import type { Actions, RequestEvent } from "./$types"
import { goto } from "$app/navigation";
import { fail, redirect } from "@sveltejs/kit";
import { ACCESS_TOKEN, USER_ID } from "../../constants";

export const actions: Actions = {
    login: async ({ cookies, request }) => {
        const data = await request.formData();
        const email_id = data.get('email_id')?.toString();
        const password = data.get('password')?.toString();
        const loginRequest: AuthLoginPostRequest = {email_id, password};
        try {
            const loginResp = await AuthenticationService.authLoginPostAuthLoginPost(loginRequest);            
            cookies.set(ACCESS_TOKEN, loginResp);
            const user = await UsersService.usersUserIdGetUserGet();
            cookies.set(USER_ID, user.user_id!);
        } catch (err) {
            const apiError = err as ApiError
            return fail(apiError.status, { errorMessage: apiError.message})
        }
        throw redirect(302, "/");
    }
}