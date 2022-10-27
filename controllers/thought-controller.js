const { Thought, User } = require('../models');

module.exports = {
  // * `GET` to get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // * `GET` to get a single thought by its `_id`
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // * `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)
  createThought(req, res) {
    Thought.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: _id } },
          { new: true }
          // ```json
          // // example data
          // {
          //   "thoughtText": "Here's a cool thought...",
          //   "username": "lernantino",
          //   "userId": "5edff358a0fcb779aa7b118b"
          // }
          // ```
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
            message: 'thought created, but found no user with that ID',
          })
          : res.json('Thought created! 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // * `PUT` to update a thought by its `_id`
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // * `DELETE` to remove a thought by its `_id`   
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No course with that ID' })
          : Thought.deleteMany({ _id: { $in: Thought.reactions } })
      )
      .then(() => res.json({ message: 'User and thought(s) deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // * `POST` to create a reaction stored in a single thought's `reactions` array field
  createReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.body.thoughtId },
        { $push: { reactions: body } },
        { new: true }
        )
      .select('-__v')
      .populate({path: 'reactions', select: '-__v'})
      .then((user) =>
        !user
          ? res.status(404).json({
            message: 'Application created, but found no user with that ID',
          })
          : res.json('Created the application 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // * `DELETE` to pull and remove a reaction by the reaction's `reactionId` value
  // deleteThought(req, res) {
  //   Thought.findOneAndRemove({ _id: req.params.thoughtId })
  //     .then((thought) =>
  //       !thought
  //         ? res.status(404).json({ message: 'No such thought exists' })
  //         : Thought.findOneAndUpdate(
  //           { thoughts: req.params.thoughtId },
  //           { $pull: { students: req.params.thoughtId } },
  //           { new: true }
  //         )
  //     )
  //     .then((user) =>
  //       !user
  //         ? res.status(404).json({
  //           message: 'Friend deleted, but no thought found',
  //         })
  //         : res.json({ message: 'thought successfully deleted' })
  //     )
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).json(err);
  //     });
  // },
}

// _____________________________________________________________________
