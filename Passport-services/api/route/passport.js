const router = require("express").Router();
const {
  createPassport,
  getPassport,
  updatePassport,
  deletePassport,
} = require("../controller/passport");

const userValidator = require("../validation/passport"); // Validation Schema
const validate = require("../middleware/validate");

const { verifyToken, authorizeRole } = require("../middleware/authorization");

router.post(
  "/",
  verifyToken,
  authorizeRole("admin"),
  validate(userValidator.passportSchema),
  createPassport
);

router.get("/:id", verifyToken, getPassport);

router.put("/:id", verifyToken, authorizeRole("admin"), updatePassport);

router.delete("/:id", verifyToken, authorizeRole("admin"), deletePassport);

module.exports = router;
