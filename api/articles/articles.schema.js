const { Schema, model } = require("mongoose");

const articleSchema = Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  content: {
    type: String,
    required: [true, "Content is required"],
  },
  status: {
    type: String,
    enum: {
      values: ["draft", "published"],
      message: "{VALUE} is not a valid status",
    },
    default: "draft", // par défaut
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

articleSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

let Article;

module.exports = Article = model("Article", articleSchema);