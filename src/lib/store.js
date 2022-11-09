import { writable } from "svelte/store";
import { browser } from "$app/env";

const btc = import.meta.env.VITE_BTC;

const persisted = (k, i) => {
  if (
    browser &&
    sessionStorage.getItem(k) &&
    sessionStorage.getItem(k) !== "undefined"
  ) {
    try {
      i = JSON.parse(sessionStorage.getItem(k));
    } catch (e) {}
  }

  let s = writable(i);
  s.subscribe((v) => browser && sessionStorage.setItem(k, JSON.stringify(v)));
  return s;
};

export const addresses = writable();
export const art = writable();
export const artworks = writable([]);
export const artworksLimit = writable(10);
export const commentsLimit = writable(10);
export const asset = writable({ asset: btc });
export const assets = writable([]);
export const balances = writable({});
export const edition = writable();
export const error = writable();
export const fee = writable(100);
export const fiat = writable("USD");
export const filterCriteria = writable({
  listPrice: false,
  openBid: false,
  ownedByCreator: false,
  hasSold: false,
});
export const full = writable();
export const loading = writable();
export const locked = writable();
export const messageUser = writable({});
export const unreadMessages = writable([]);
export const storeMessages = writable([]);
export const loggedIn = writable();
export const tipUser = writable({});
export const meta = writable();
export const password = writable();
export const pending = writable();
export const poll = writable([]);
export const popup = writable();
export const prompt = writable();
export const psbt = writable();
export const redirect = writable();
export const results = writable([]);
export const role = writable("user");
export const show = writable();
export const sighash = writable();
export const snack = writable();
export const sortCriteria = writable("newest");
export const bitcoinUnitLocal = writable("");
export const fiatRates = writable({});
export const painting = writable();
export const variation = writable();
export const titles = writable([]);
export const assetCount = persisted("assetCount", 0);
export const token = writable();
export const transactions = writable([]);
export const confirmed = persisted("confirmed", {});
export const unconfirmed = persisted("unconfirmed", {});
export const user = writable();
export const wallet = writable();
export const txcache = writable({});
export const username = persisted("username");
export const acceptStatus = writable();
export const signStatus = writable();
export const txCount = persisted("txCount", 0);
