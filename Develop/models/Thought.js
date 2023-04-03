const { Schema, model } = require("mongoose");

//Schema to post new thought
const thoughtSchema = new Schema({
  thoughtText: { type: String, required: true, maxlength: 280 },
  createdAt: { type: Date, default: Date.now, get: (date) => timeSince(date) },
  username: { type: String, required: true },
  reactions: [{ reactionSchema }],
});

//Virtual property 'reactionCount' that retrieves the length of the thoughts reactions array field on query.
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

//Initialize the thought Model
const Thought = model("thought", thoughtSchema);

model.exports = Thought;
