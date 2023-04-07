const { Schema, model, Types } = require("mongoose");
const moment = require("moment");

//Schema to post a new reaction
const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    //Getter method for date format using moment
    get: (currentdate) => moment(currentdate).format("MMM DD, YYYY hh:mm a"),
  },
});

//Schema to post new thought
const thoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, maxlength: 280 },
    createdAt: {
      type: Date,
      default: Date.now,
      //Getter method for date format using moment
      get: (currentdate) => moment(currentdate).format("MMM DD, YYYY hh:mm a"),
    },
    username: { type: String, required: true },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//Virtual property 'reactionCount' that retrieves the length of the thoughts reactions array field on query.
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

//Initialize the thought Model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
