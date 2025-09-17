const router = require("express").Router();
const {
  getAllNotifications,
  testNotification,
} = require("../../controller/notification/notification");

const {
  verifyToken,
  authorizeRole,
} = require("../../middleware/authorization");

router.get("/", verifyToken, authorizeRole("admin"), getAllNotifications);
router.post("/test", verifyToken, testNotification);

module.exports = router;
