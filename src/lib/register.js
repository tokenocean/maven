import { api } from "$lib/api";
import { validateEmail } from "$lib/utils";
import { createWallet } from "$lib/wallet";
import wordlist from "$lib/wordlist";
import { generateMnemonic } from "bip39";

export const register = async (
  email,
  username,
  password,
  first_name,
  last_name,
  shipping_address,
  country,
  zipcode,
  city,
  state
) => {
  if (!validateEmail(email)) throw new Error("Invalid email");
  if (password.length < 8) throw new Error("Password must be 8 characters");

  return api
    .url("/register")
    .post({
      email,
      password,
      username,
      first_name,
      last_name,
      shipping_address,
      country,
      zipcode,
      city,
      state,
      ...createWallet(
        generateMnemonic(undefined, undefined, wordlist),
        password
      ),
    })
    .res();
};
