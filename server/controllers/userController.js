const User = require("../models/User");

exports.getMyInfo = async (req, res) => {
  try {
    const { email } = req.query;

    const user = await User.findOne({ email: email }).lean();
    const friendList = await User.find({ _id: { $in: user.friendList }});

    res.json({
      users: friendList,
      user: user,
    });
  } catch (error) {
    res.json({ error });
  }
};

exports.postRegister = async (req, res) => {
  try {
    const { email, password } = req.body.user;

    const user = await User.findOne({ email: email }).lean();

    if (user) {
      return res.json({ user: user });
    }

    const newUser = await User.create(
      {
        email: email,
        password: password,
      },
      { new: true },
    );

    res.json({ user: newUser });
  } catch (error) {
    res.json({ error });
  }
};

exports.getNotFriendList = async (req, res) => {
  try {
    const { email } = req.query;

    const user = await User.findOne({ email: email }).lean();

    if (user.friendList.length === 0) {
      const notFriendList = await User.find({ _id: { $ne: user._id} }).limit(5);
      return res.json({ users: notFriendList });
    }

    const friendList = await User.find({ _id: { $nin: user.friendList, $ne: user._id } }).limit(5);

    if (friendList) {
      return res.json({ users: friendList });
    }

    res.json({ message: "ok" });
  } catch (error) {
    res.json({ error });
  }
};

exports.postAddFriend = async (req, res) => {
  try {
    const { id, email } = req.body;

    const user = await User.findOne({ email: email }).lean();
    const alreadyFreind = user.friendList.find(item => item.toString() === id);

    if (alreadyFreind) {
      return res.json({message: "already friend"});
    }

    await User.findOneAndUpdate(
      { email: email },
      { $push: { friendList: id }},
    );

    res.json({ message: "ok" });
  } catch (error) {
    res.json({ error });
  }
};