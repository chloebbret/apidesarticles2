const express = require("express");
const router = express.Router();
const articlesController = require("../articles/articles.controller");
const authMiddleware = require("../../middlewares/auth");

router.post("/", authMiddleware, articlesController.create);
router.put("/:id", authMiddleware, articlesController.update);
router.delete("/:id", authMiddleware, articlesController.delete);

router.get("/", articlesController.getAll);
router.get("/:id", articlesController.getById);
router.get("/user/:userId", articlesController.getByUserId);

module.exports = router;