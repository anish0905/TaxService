const express = require("express");
const upload = require("../middleware/upload");
const videoController = require("../controllers/VideoController");  
const router = express.Router();

router.post("/upload", upload.single("video"), videoController.uploadVideo);
router.get("/", videoController.getAllVideos);
router.get("/:id", videoController.getVideoById);
router.put("/:id", upload.single("video"), videoController.updateVideo);
router.delete("/:id", videoController.deleteVideo);

module.exports = router;
