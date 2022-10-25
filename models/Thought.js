const { Schema, model } = require('mongoose');


// **Thought**:
const thoughtSchema = new Schema(
    {
        // * `thoughtText`
        thoughtText: {
            //   * String
            type: String,
            //   * Required
            required: true,
            //   * Must be between 1 and 280 characters
            maxlength: 280,

        },
        // * `createdAt`
        createdAt: {
            //   * Date
            type: Date,
            //   * Set default value to the current timestamp
            default: Date.now,
        },
        // * `username` (The user that created this thought)
        //   * String
        //   * Required

        // * `reactions` (These are like replies)
        //   * Array of nested documents created with the `reactionSchema`
    },
    // **Schema Settings**:
    // Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

    //   * Use a getter method to format the timestamp on query

thoughtSchema
.virtual('currentDate')
//Getter
.get(function () {
})


module.exports =  thoughtSchema;