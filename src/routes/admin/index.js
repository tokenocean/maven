import { getSamples } from "$queries/users";

export async function GET({ locals: { jwt, q }}) {
  console.log("INSIDE GET", jwt, q)
  return {
    body: {
      users: (
        await q(getSamples, undefined, {
          "authorization": `Bearer ${jwt}`,
          "x-hasura-role": "approver",
        })
      ).users.sort(
        (a, b) => a.username && a.username.localeCompare(b.username)
      ),
    },
  };
}
