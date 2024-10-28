import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { ACCESS_TOKEN, IS_USER_DATA_SET, USER_ID, USER_NAME } from "../../../constants";

export const load: PageServerLoad = ({cookies}) => {
    /* @migration task: add path argument */ cookies.delete(ACCESS_TOKEN, {path: "/"});
    /* @migration task: add path argument */ cookies.delete(USER_ID, {path: "/"});
    cookies.delete(USER_NAME, {path: "/"});
    cookies.set(IS_USER_DATA_SET, "false", {path: "/"});
}