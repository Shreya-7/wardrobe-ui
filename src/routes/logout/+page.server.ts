import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { ACCESS_TOKEN } from "../../constants";

export const load: PageServerLoad = ({cookies}) => {
    cookies.delete(ACCESS_TOKEN);
}