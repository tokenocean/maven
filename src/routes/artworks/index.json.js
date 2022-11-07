import { countArtworks, getLimited } from "$queries/artworks";
import { hbp } from "$lib/api";

export async function POST({ request, locals }) {
  try {
    let body = await request.json();
    let { q } = locals;
    let {
      limit,
      offset = 0,
      where = {},
      order_by = { sequence: "asc" },
    } = body;

    let { artworks_aggregate: a } = await q(countArtworks, { where });
    let { artworks } = await q(getLimited, { limit, offset, order_by, where });

    return {
      body: {
        artworks,
        total: a.aggregate.count,
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
