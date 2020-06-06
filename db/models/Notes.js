const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotesSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    data: [
      {
        name: {
          type: String,
          require: true,
          default: "",
        },
        index: {
          type: Number,
          require: true,
        },
        edit: {
          type: Boolean,
          require: true,
          default: false,
        },
        content: {
          type: String,
          default: "",
        },
      },
    ],
  },
  {
    versionKey: false,
  }
);

module.exports = User = mongoose.model("notes", NotesSchema);
