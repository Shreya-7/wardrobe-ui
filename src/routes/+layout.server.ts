import { OpenAPI, UsersService } from "../client";
import { ACCESS_TOKEN, IS_USER_DATA_SET, USER_ID, USER_NAME } from "../constants";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ cookies }) => {
    const accessToken = cookies.get(ACCESS_TOKEN);
    if (!accessToken) {
        return {}
    }
    OpenAPI.TOKEN = accessToken;
    if (accessToken && (cookies.get(IS_USER_DATA_SET) === "true")) {
        return {
            user: {
                name: cookies.get(USER_NAME)
            }
        }
    }
    try {
        const user = await UsersService.usersUserIdGetUserGet();
        cookies.set(USER_ID, user.user_id!);
        cookies.set(USER_NAME, user.name!);
        cookies.set(IS_USER_DATA_SET, "true");
        // not returning the entire object to maintain uniformity with the early return above
        return {
            user: {
                name: user.name
            }
        }
    }
    catch (err) {
        console.log(err)
        return {}
    }
}) satisfies LayoutServerLoad;