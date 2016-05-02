var express = require('express');
// Schema
var Palette = require('../models/palette');

// ROUTES FOR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

router.route('/')
  .get(function(req, res) {
    Palette.find(function(err, palettes) {
      if (err) res.send(err);
      res.send(palettes);
    });
  });

// on routes that end in /palettes
router.route('/create')
  .post(function(req, res) {
      var palette = new Palette();

      if (req.body.title !== undefined && req.body.color1 !== undefined && req.body.color2 !== undefined && req.body.color3 !== undefined && req.body.color4 !== undefined) {
        palette.title = req.body.title;
        palette.colors[0] = req.body.color1;
        palette.colors[1] = req.body.color2;
        palette.colors[2] = req.body.color3;
        palette.colors[3] = req.body.color4;

        palette.save(function(err) {
          if (err) res.send(err);

          res.json({
            message: 'Palette created'
          });
      });
      } else {
        res.status(400).json({
          error: 'Palette title & colors cannot be blank'
        });
      }
  });

module.exports = router;
