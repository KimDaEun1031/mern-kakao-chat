exports.postCreateChatRoom = async (req, res, next) => {
  try {
    console.log(req);
  } catch (error) {
    res.json({ error });
  }
};
