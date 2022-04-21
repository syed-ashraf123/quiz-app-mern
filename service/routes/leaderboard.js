const router = require("express").Router();
const User = require("../models/User");
router.get("/", async (req, res) => {
  // Fetching the users
  const leaders = await User.find()
    .skip(req.query.page * 10)
    .limit(10);

  // Counting the users
  const count = await User.countDocuments();

  // Sending the response
  res.send([leaders, { count: count }]);
});

module.exports = router;
