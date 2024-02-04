import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { ACCESS_TOKEN, USER_ID } from "../../constants";

export const load: PageServerLoad = ({cookies}) => {
    cookies.delete(ACCESS_TOKEN);
    cookies.delete(USER_ID);
}