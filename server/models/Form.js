const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [
    {
      questionText: String,
      type: { type: String, enum: ["text", "mcq"], default: "text" },
      options: [String]
    }
  ],
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" }
});

module.exports = mongoose.model("Form", formSchema);
