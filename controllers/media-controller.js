const router = require('express').Router();
const Media = require('../db').import('../models/media');
const validateSession = require("../middleware/validate-session");
const validateAdmin = require("../middleware/validate-admin");

/******************************
 ***** Get Media *********
 ******************************/
router.get("/", (req, res) => {

    const orderBy = {order: 
        [["media", 'DESC']]
    };
    
    Media.findAll(orderBy)
      .then((media) => res.status(200).json({
        media:   media.media,
        message:    'Successfully retrieved media.'
    }))
      .catch((err) => res.status(500).json({error: err}));

});
  
/**************************************
 ***** Get Media By MediaID *****
***************************************/
router.get("/:mediaID", (req, res) => {

    const query = {where: {
        mediaID: {[Op.eq]: req.params.mediaID}
    }};

    Media.findOne(query)
    .then((media) => res.status(200).json({
        media:   media.media,
        message:    'Successfully retrieved media information.'
        }))
    .catch((err) => res.status(500).json({error: err}));

});

/* ******************************
 *** Add Media ***************
*********************************/
// Allows an admin to add a new media
router.post('/', (req, res) => {

    const createMedia = {
        media:   req.body.media.media,
        active:     req.body.media.active
      };

      Media.create(createMedia)
    .then((media) => res.status(200).json({
        media:   media.media,
        active:     media.active,
        message:    'Media successfully created.'
    }))
    .catch(err => res.status(500).json({error: err}))
});

/***************************
 ******* Update Media *******
 ***************************/
// Allows an admin to update the media including soft delete it
router.put("/:mediaID", validateAdmin, (req, res) => {

    const updateMedia = {
        media:   req.body.media.media,
        active:     req.body.media.active
      };

      const query = {where: {
        mediaID: {[Op.eq]: req.params.mediaID}
    }};

    Media.update(updateMedia, query)
    .then((media) => res.status(200).json({
        media:   media.media,
        active:     media.active,
        message:    'Media successfully updated.'
    }))
    .catch((err) => res.status(500).json({error: err}));

  });

module.exports = router;