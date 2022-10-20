import toBuffer from "blob-to-buffer";
import { formatISO } from "date-fns";
import fs from "fs";
import path from "path";
import { app } from "./app.js";

import "make-promises-safe";
import "./auth.js";
import "./artworks.js";
import "./auctions.js";
import "./coinos.js";
import "./proxy.js";
import "./monitor.js";
import "./signing.js";
import "./upload.js";
import "./mail.js";
import "./utxos.js";

app.listen(8091, "0.0.0.0", function (err, address) {
  if (err) {
    console.log(err);
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`server listening on ${address}`);
});