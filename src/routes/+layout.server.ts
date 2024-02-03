import { OpenAPI, UsersService } from "../client";
import type { LayoutServerLoad } from "./$types";


export const load = (async ({ cookies }) => {
  OpenAPI.TOKEN = `${cookies.get('accessToken')}`
  try {
    const user = await UsersService.usersUserIdGetUserGet();
    return { user } 
  }
  catch (err) {
    console.log(err)
    return {}
  }
}) satisfies LayoutServerLoad;