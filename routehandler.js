exports.postuserdata = async (req, res) => {
  console.log("the postuser data handler has been called");
  try {
    res.send("congratulations......u are now on the user posting file");
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "there is some error while posting the data"
    });
  }
};
