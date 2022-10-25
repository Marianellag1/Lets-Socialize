const { Schema, model } = require('mongoose');

// **User**:
//Schema to create User model
// * `username`
const userSchema = new Schema(
    {
        username: {
            //   * String
            type: String,
            //   * Unique
            unique: true,
            //   * Required
            required: true,
            //   * Trimmed
        },
        // * `email`
        email: {
            //   * String
            type: String,
            //   * Required
            required: true,
            //   * Unique

            //   * Must match a valid email address (look into Mongoose's matching validation)
        },
        // * `thoughts`
        thoughts: [
            {
                //   * Array of `_id` values referencing the `Thought` model
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            }
        ],
        // * `friends`
        friends: [
            {
                //   * Array of `_id` values referencing the `User` model (self-reference)
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ]



    },
    {
        // **Schema Settings**:
        // Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

const User = model('user', userSchema);

module.exports = User;

