const router = require("express").Router();
const uploadsController = require("../../controllers/uploadsController");

router.route("/")
  .get(uploadsController.findAll)
  .post(uploadsController.create);

  router.route('/mine')
  .post(uploadsController.findOnCondition);

router.route("/:id")
  .get(uploadsController.findById)
  .put(uploadsController.update)
  .delete(uploadsController.remove);


module.exports = router;
