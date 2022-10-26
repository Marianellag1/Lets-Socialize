const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');


// **Thought**:
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,

        },
        createdAt: {
            type: Date,
            default: Date.now,
            // get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
    // **Schema Settings**:
);


// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

//   * Use a getter method to format the timestamp on query
thoughtSchema
    .virtual('currentDate')
    //Getter
    .get(function () {
    })

const Thought = model('thought', thoughtSchema);

module.exports = Thought;