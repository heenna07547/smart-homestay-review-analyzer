const mongoose = require("mongoose");

const uri = "PASTE_YOUR_MONGO_URI_HERE";

mongoose.connect(uri)
  .then(() => {
    console.log("✅ Connected!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });