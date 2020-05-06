const router = require('express').Router();
const Review = require('../db').import('../Models/reviews');
const validateSession = require('../Middleware/validateSession');



router.get('/', validateSession, (req, res) => {
    Review.findAll()
        .then(review => res.status(200).json(review))
        .catch(err => res.status(500).json( {
            error:err
        }))
});


router.get("/myOwn", validateSession, (req, res) => {
    let userid = req.user.id
    Review.findAll({
        where: { owner: userid }
    })
    .then(review => res.status(200).json(review))
    .catch(err => res.status(500).json({ error: err }))
});


router.post('/', validateSession, (req, res) => {
    const reviewFromRequest = {
        filmTitle: req.body.review.filmTitle,
        year: req.body.review.year,
        director: req.body.review.director,
        overallThoughts: req.body.review.overallThoughts,
        rating: req.body.review.rating,
        owner: req.user.id
    }
    Review.create(reviewFromRequest)
        .then(review => res.status(200).json(review))
        .catch(err => res.json(req.errors))
});


router.get('/:title', (req, res) => {
    Review.findOne({ where: { filmTitle: req.params.title }})
      .then(review => res.status(200).json(review))
      .catch(err => res.status(500).json({
          error:err
      }))
  });


router.put('/:id', (req, res) => {
    Review.update(req.body.review, { where: { id: req.params.id }})
      .then(review => res.status(200).json(review))
      .catch(err => res.json({
          error: err
      }))
  });


  router.delete('/:id', (req, res) => {
      Review.destroy({
          where:{
              id: req.params.id
          }
      })
      .then(review => res.status(200).json(review))
      .catch(err => res.json({
          error: err
      }))
  });



module.exports = router;