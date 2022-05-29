const express = require("express");
const router = express.Router();

const { postCreateChatRoom } = require("../controllers/chatController");

router.get("/addroom", postCreateChatRoom);

module.exports = router;
