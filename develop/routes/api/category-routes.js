const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [Product, { model: Product }],
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [Product, {model: Product}],
  })
  .then((data) => {
    res.status(200).json(data);
  })
  .catch((err) => {
    console.log(err);
    res.status(404).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((category) => {
    if (req.body.categoryIds.length) {
      const categoryIdArr = req.body.categoryIds.map((category_id) => {
        return {
          category_id: category.id, category_id,
        }
      })
      return Category.bulkCreate(categoryIdArr);
    }
    res.status(200).json(category);
  })
  .then((categoryIdArr) => res.status(200).json(categoryIdArr))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
})
});


router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    category_name: req.body.category_name,
  },
  {
    where: {
      id: req.params.id,
    },
  })
  .then((data) => res.json(data))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  })
  });

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.distroy({
      where: {
        id: req.params.id
      },
    })
    .then((data) => {
      res.status(200).json(data);
    })
  .catch((err) => {
    console.log(err);
    res.status(404).json(err);
  })
});

module.exports = router;
