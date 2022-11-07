import { getDefaultRoyaltyRecipients } from "$queries/royalty_recipients";

export async function GET({ locals: { q } }) {
  try {
    const { default_royalty_recipients } = await q(getDefaultRoyaltyRecipients);

    return {
      body: {
        default_royalty_recipients,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      body: {},
      status: 500,
    };
  }
}
