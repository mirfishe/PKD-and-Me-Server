const router = require('express').Router();
const Media = require('../db').import('../models/media');
const validateSession = require("../middleware/validate-session");
const validateAdmin = require("../middleware/validate-admin");

/******************************
 ***** Get Media *********
 ******************************/
router.get("/", (req, res) => {

    const query = {where: {
        active: {[Op.eq]: true}
    }};

    const orderBy = {order: 
        [["sortID", 'DESC']]
    };
    
    Media.findAll(query, orderBy)
      .then((media) => res.status(200).json({
        media:      media.media,
        sortID:     media.sortID,
        active:     media.active,
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
        sortID:     media.sortID,
        active:     media.active,
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
        media:      req.body.media.media,
        active:     req.body.media.active
      };

      Media.max('sortID')
      .then((maxSortID) => {
          // console.log("maxSortID", maxSortID);
          if (isNaN(maxSortID)) {
              return 1;
          } else {
              return maxSortID + 1;
          };
      })
    .then(newSortID => {
        Media.create(createMedia)
    })
    .then((media) => res.status(200).json({
        media:      media.media,
        sortID:     newSortID,
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
        media:      req.body.media.media,
        sortID:     req.body.media.sortID,
        active:     req.body.media.active
      };

      const query = {where: {
        mediaID: {[Op.eq]: req.params.mediaID}
    }};

    Media.update(updateMedia, query)
    .then((media) => res.status(200).json({
        media:      media.media,
        sortID:     media.sortID,
        active:     media.active,
        message:    'Media successfully updated.'
    }))
    .catch((err) => res.status(500).json({error: err}));

  });

/***************************
 ******* Delete Media *******
 ***************************/
// Allows an admin to hard delete the media
router.delete("/:mediaID", validateAdmin, (req, res) => {

    const query = {where: {
        mediaID: {[Op.eq]: req.params.mediaID}
    }};

    Media.destroy(query)
    .then(() => res.status(200).send("Media successfully deleted."))
    .catch((err) => res.status(500).json({error: err}));

  });

module.exports = router;