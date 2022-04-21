const router = require("express").Router();
const User = require("../models/User");
const { registerSchema } = require("../validation/validation");
router.post("/", async (req, res) => {
  // Validation
  const { error, value } = registerSchema(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //If email is present or not
  const emailExist = await User.findOne({ email: req.body.email });

  //If email exists than change name
  if (emailExist) {
    if (emailExist.name !== req.body.name) {
      const filter = { email: req.body.email };
      delete req.body.email;
      const update = req.body;
      const updatedUser = await User.findOneAndUpdate(filter, update, {
        new: true,
      });
      // Send the updated user
      return res.status(202).send({ user: updatedUser });
    }
    //If email exists and name is same than send the user
    return res.status(200).send({ user: emailExist });
  }

  //Saving in Database // Creating a User
  const user = new User(req.body);
  const savedUser = await user.save();

  //Sending the response
  return res.status(201).send({ user: savedUser });
});

module.exports = router;
