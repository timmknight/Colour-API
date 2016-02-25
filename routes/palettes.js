var express = require('express');

// Schema
var Palette = require('../models/palette');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// MIDDLEWARE
// router.use(function(req, res, next) {
//   console.log('Someone entered');
//   next();
// });

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
// router.get('/', function(req, res) {
//   res.json({
//     message: 'hooray! welcome to our api!'
//   });
// });

router.post('/palettes', function(req, res) {
  console.log('Attempting to post');
});

// more routes for our API will happen here

// on routes that end in /palettes
router.route('/')
  .post(function(req, res) {

    // if(!req.body.title) {
    //   res.json({
    //     message: 'Title cannot be blank'
    //   });
    // } else if(req.body.title.length > 30) {
    //   res.json({
    //     message: 'Title cannot be more than 30 characters'
    //   });
    // } else if(req.body.colors.length <= 0) {
    //     res.json({
    //       message: 'Color palette cannot be blank'
    //     })
    // } else if(req.body.colors.length === 1) {
    //   res.json({
    //     message: 'Color palette must have more than one color'
    //   });
    // } else {
      console.log(req.body.colors);
      var palette = new Palette();
      palette.title = req.body.title;
      palette.colors = req.body.colors;

// console.log(req.body.colors);
      palette.save(function(err) {
        if (err) res.send(err);

        res.json({
          message: 'Palette created'
        });
    });
  // }



    // switch (req.body.colors.length) {
    //   case 0:
    //     res.json({
    //       message: 'Title cannot be blank'
    //     });
    //     break;
    //   case > 30:
    //     res.json({
    //       message: 'Title cannot be longer than 30 characters'
    //     });
    //     break;
    //   case req.body.colors.length === 0:
    //     res.json({
    //       message: 'Color palette cannot be blank'
    //     });
    //     break;
    //     case req.body.colors.length === 1:
    //     res.json({
    //       message: 'Color palette must have two or more colors'
    //     });
    //     break;
    //   default:
    //   console.log(req.body.colors);
    //   var palette = new Palette();
    //   palette.title = req.body.title;
    //   palette.colors = req.body.colors;
    //
    //   palette.save(function(err) {
    //     if (err) res.send(err);
    //
    //     res.json({
    //       message: 'Palette created'
    //     });
    //   });
    //
    // }

    // if (!req.body.title) {
    //   res.json({
    //     message: 'Title cannot be blank'
    //   })
    // } else if (req.body.colors.length > 0) {
    //   res.json({
    //     message: 'Color palette cannot be blank'
    //   })
    // } else {
    //   console.log(req.body.colors);
    //   var palette = new Palette();
    //   palette.title = req.body.title;
    //   palette.colors = req.body.colors;
    //
    //   palette.save(function(err) {
    //     if (err) res.send(err);
    //
    //     res.json({
    //       message: 'Palette created'
    //     });
    //   });
    // }
  })

  .get(function(req, res) {
    Palette.find(function(err, palettes) {
      if (err) res.send(err);
      console.log(palettes);
      res.send(palettes);
    });
  });

// on routes that end in /palettes/:palette_id
router.route('/:palette_id')
  // .get(function(req, res) {
  //   Palette.findById(req.params.palette_id, function(err, palette) {
  //     if (err) res.send(err);
  //
  //     res.json(palette);
  //   });
  // })

  .put(function(req, res) {
    Palette.findById(req.params.palette_id, function(err, palette) {
      if (err) res.send(err);

      // palette.title = req.body.title;
      // palette.colors = req.body.colors;

      palette.likes++;

      palette.save(function(err) {
        if (err) res.send(err);

        res.json({
          message: 'Palette updated'
        });
      });
    })
  })

  // .delete(function(req, res){
  //     Palette.remove({
  //       _id: req.params.palette_id
  //     }, function(err, palette) {
  //       if (err) res.send(err);
  //
  //       res.json({ message: 'Palette deleted'});
  //     });
  // });

module.exports = router;
