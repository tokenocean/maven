import { page, session } from "$app/stores";
import { api } from "$lib/api";
import decode from "jwt-decode";
import { tick } from "svelte";
import { get } from "svelte/store";
import {
  redirect,
  password as pw,
  poll,
  prompt,
  user,
  token,
} from "$lib/store";
import { PasswordPrompt } from "$comp";
import { goto, err } from "$lib/utils";

export const expired = (t) => !t || decode(t).exp * 1000 < Date.now();

export const requireLogin = async (p) => {
  if (p && p.url && p.url.pathname === "/login") return;
  let $token = get(token);
  try {
    if (expired($token)) throw new Error("Login required");
  } catch (e) {
    console.log(e);
    if (p && p.url) redirect.set(p.url.pathname);
    goto("/login");
    throw e;
  }
};

export const requirePassword = async (p) => {
  await requireLogin(p);
  if (get(pw)) return;
  let unsub;
  await new Promise(
    (resolve) =>
      (unsub = pw.subscribe((password) =>
        password ? resolve() : prompt.set(PasswordPrompt)
      ))
  );
  unsub();
  await tick();
};

export const activate = (ticket) => {
  return api.url("/activate").query({ ticket }).get().res();
};
