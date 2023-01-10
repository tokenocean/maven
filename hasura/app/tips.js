import { app } from "./app.js";
import { auth } from "./auth.js";
import { getUser, getUserById } from "./utils.js";
import { btc } from "./wallet.js";
import { Psbt } from "liquidjs-lib";
import { createTransaction } from "./queries.js";
import { q } from "./api.js";
import { mail } from "./mail.js";

app.post("/tips", auth, async (req, res) => {
  try {
    let { amount, psbt, artist } = req.body;

    let user = await getUser(req);
    
    let transaction = {
      amount,
      asset: btc,
      hash: Psbt.fromBase64(psbt).extractTransaction().getId(),
      user_id: user.id,
      psbt,
      type: "tip",
    };

    await q(createTransaction, { transaction });

    await mail.send({
      template: "tip-received",
      locals: {
        tipperName: user ? user.username : "",
        artistName: artist.username,
        tipAmount: `${amount / 100000000} L-BTC`,
      },
      message: {
        to: user.display_name,
      },
    });

    res.send({ ok: true });
  } catch (e) {
    console.log(e);
    res.code(500).send(e.message);
  }
});
