import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { ACCESS_TOKEN, IS_USER_DATA_SET, USER_ID, USER_NAME } from "../../../constants";

export const load: PageServerLoad = ({cookies}) => {
    cookies.delete(ACCESS_TOKEN);
    cookies.delete(USER_ID);
    cookies.delete(USER_NAME);
    cookies.set(IS_USER_DATA_SET, "false", {secure: false});
}