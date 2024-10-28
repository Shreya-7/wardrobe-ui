import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { ACCESS_TOKEN, USER_ID } from "../../../constants";

export const load: PageServerLoad = ({cookies}) => {
    /* @migration task: add path argument */ cookies.delete(ACCESS_TOKEN);
    /* @migration task: add path argument */ cookies.delete(USER_ID);
}