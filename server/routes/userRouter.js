const express = require("express");
const router = express.Router();

const { postRegister, getNotFriendList, postAddFriend, getMyInfo } = require("../controllers/userController");

router.get("/", getMyInfo);
router.get("/notfriend", getNotFriendList);
router.post("/register", postRegister);
router.post("/addfriend", postAddFriend);

module.exports = router;
