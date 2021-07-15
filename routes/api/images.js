const router = require('express').Router();

router.route('/')
  .get(async (req, res) => {
    const { resources } = await cloudinary.search
      .expression('folder:dev_setups')
      .sort_by('public_id', 'desc')
      .max_results(30)
      .execute();

    const publicIds = resources.map((file) => file.public_id);
    res.send(publicIds);
  });

module.exports = router;