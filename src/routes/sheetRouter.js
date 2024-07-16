import { Router } from "express";
const router = Router();
import authenticateToken from "../middleware/authenticateToken.js";
import {
  getsAllDataController,
  getValueController,
  createNewRowController,
  updateNewRowController,
  hideRowController,
  getsReportDataController,
  getsUserDataController
} from "../controllers/sheetController.js";
import { sequelize } from "../postgres/postgres.js";

router.use(authenticateToken);

router.get('/table-names', async (req, res) => {
  try {
    const tableNames = await sequelize.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'powersheet'",
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );
    const listTableNames = tableNames.map((table) => table[0]);
    listTableNames.sort();
    res.json(listTableNames);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách bảng:", error);
    res.status(500).json({ message: "Lỗi khi lấy danh sách bảng" });
  }
});

router.get("/report/:table/:dateRange", getsReportDataController)

router.get("/:table", getsAllDataController);

router.get("/price/:table/:phoneNumber",  getsUserDataController);

router.get("/:table/:column", getValueController);

router.post("/", createNewRowController);

router.put("/:id/:table", updateNewRowController);

router.delete("/:id/:table", hideRowController);


export default router;