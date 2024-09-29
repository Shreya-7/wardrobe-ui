import { OpenAPI, UsersService } from "../client";
import { ACCESS_TOKEN, USER_ID } from "../constants";
import type { LayoutServerLoad } from "./$types";


export const load = (async ({ cookies }) => {
    const accessToken = cookies.get(ACCESS_TOKEN);
    OpenAPI.TOKEN = accessToken;
    try {
        const user = await UsersService.usersUserIdGetUserGet();
        cookies.set(USER_ID, user.user_id!);
        return { user }
    }
    catch (err) {
        console.log(err)
        return {}
    }
}) satisfies LayoutServerLoad;