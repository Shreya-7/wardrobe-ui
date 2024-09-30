import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { ACCESS_TOKEN } from "../../constants";

export const load = (async ({ cookies }) => {
    const accessToken = cookies.get(ACCESS_TOKEN);
    if (!accessToken) {
        throw redirect(302, "/unauthorised");
    }
}) satisfies LayoutServerLoad;