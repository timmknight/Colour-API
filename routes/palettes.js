var express = require('express');

// Schema
var Palette = require('../models/palette');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// MIDDLEWARE
router.use(function(req, res, next) {
  console.log('Someone entered');
  next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({
    message: 'hooray! welcome to our api!'
  });
});

router.post('/palettes', function(req, res) {
  console.log('Attempting to post');
});

// more routes for our API will happen here

// on routes that end in /palettes
router.route('/palettes')
  .post(function(req, res) {
    var palette = new Palette();
    palette.title = req.body.title;
    palette.colors = req.body.colors;

    palette.save(function(err) {
      if (err) res.send(err);

      res.json({
        message: 'Palette created'
      });
    });
  })

  .get(function(req, res) {
    Palette.find(function(err, palettes) {
      if (err) res.send(err);

      res.json(palettes);
    });
  });

// on routes that end in /palettes/:palette_id
router.route('/palettes/:palette_id')
  .get(function(req, res) {
    Palette.findById(req.params.palette_id, function(err, palette) {
      if (err) res.send(err);

      res.json(palette);
    });
  })

  .put(function(req, res) {
    Palette.findById(req.params.palette_id, function(err, palette) {
      if (err) res.send(err);

      palette.title = req.body.title;
      palette.colors = req.body.colors;

      palette.save(function(err) {
        if (err) res.send(err);

        res.json({
          message: 'Palette updated'
        });
      });
    })
  })

  .delete(function(req, res){
      Palette.remove({
        _id: req.params.palette_id
      }, function(err, palette) {
        if (err) res.send(err);

        res.json({ message: 'Palette deleted'});
      });
  });

module.exports = router;
