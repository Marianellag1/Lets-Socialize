// const { Schema, model } = require('mongoose');

// module.exports = 

const reactionSchema = new Schema(
    // **Reaction** (SCHEMA ONLY)
    // * `reactionId`
    //   * Use Mongoose's ObjectId data type
    //   * Default value is set to a new ObjectId
    {
        // * `reactionBody`
        reactionBody: {
            //   * String
            type: String,
            //   * Required
            required: true,
            //   * 280 character maximum
            maxlength: 280,
        },
        // * `username`
        username: {
            //   * String
            type: String,
            //   * Required
            requiered: true,
        },
        // * `createdAt`
        createdAt: {
            //   * Date
            type: Date,
            //   * Set default value to the current timestamp
            //   * Use a getter method to format the timestamp on query
        }
    }
)




// **Schema Settings**:

// This will not be a model, but rather will be used as the `reaction` field's subdocument schema in the `Thought` model.