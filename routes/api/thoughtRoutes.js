const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thought-controller');


// **`/api/thoughts`**
router.route('/')
    .get(getThoughts)
    .post(createThought);

// **`/api/thoughts/:thoughtId/reactions`**
router
    .route('/:thoughtId/')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

module.exports = router;