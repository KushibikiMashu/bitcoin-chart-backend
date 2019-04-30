import * as express from "express";
import MigrationService from "../../Services/MigrationService";

const router = express.Router();

// Nowにはsshログインできないため、サーバー内でmigrationを実行できない。
// このため、APIでmigrationを代用している。
router.get("/", (req: express.Request, res: express.Response) => {
  MigrationService.migrate();
  res.send("Migration Succeeded.");
});

export default router;
