const router = require("express").Router();
const Media = require("../db").import("../models/media");
const {Op} = require("sequelize");
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
        [["sortID", "DESC"]]
    };
    
    Media.findAll(query, orderBy)
    .then((media) => {
        // console.log("media-controller get / media", media);
        res.status(200).json({media: media, message: "Successfully retrieved media."});
    })
    .catch((err) => {
        console.log("media-controller get / err", err);
        res.status(500).json({error: err});
    });

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
        message:    "Successfully retrieved media information."
        }))
        .catch((err) => {
            console.log("media-controller get /:mediaID err", err);
            res.status(500).json({error: err});
        });

});

/* ******************************
 *** Add Media ***************
*********************************/
// Allows an admin to add a new media
router.post("/", validateAdmin, (req, res) => {

    // Don't need this anymore; was trying to fix scoping issues
    //let newSortID = 0;

    // Moved this inside the function for scoping issues with newSortID
    // const createMedia = {
    //     media:      req.body.media.media,
    //     sortID:     newSortID
    //   };

      Media.max("sortID")
      .then((maxSortID) => {
          // console.log("media-controller maxSortID", maxSortID);
          if (isNaN(maxSortID)) {
            // newSortID = 1;
            return 1;
          } else {
            // newSortID = maxSortID + 1;
            return maxSortID + 1;
          };
      })
    .then((newSortID) => {
        // console.log("media-controller newSortID", newSortID);

        const createMedia = {
            media:      req.body.media.media,
            sortID:     newSortID
          };

        return Media.create(createMedia);
    })
    // .then((media) => res.status(200).json({media: media, message: "Media successfully created."}))
    .then((media) => {
        // console.log("media-controller post / media", media);
        res.status(200).json({
        mediaID:    media.mediaID,
        media:      media.media,
        sortID:     media.sortID,
        active:     media.active,
        message:    "Media successfully created."
        });
    })
    .catch((err) => {
        console.log("media-controller post / err", err);
        res.status(500).json({error: err});
    });

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
    // Doesn't return the values of the updated record; the value passed to the function is the number of records updated.
    // .then((media) => res.status(200).json({message: media + " media record(s) successfully updated."}))
    .then((media) => res.status(200).json({
        media:      req.body.media.media,
        sortID:     req.body.media.sortID,
        active:     req.body.media.active,
        // message:    "Media successfully updated."
        message:    media + " media record(s) successfully updated."
    }))
    .catch((err) => {
        console.log("media-controller put /:mediaID err", err);
        res.status(500).json({error: err});
    });

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
    .catch((err) => {
        console.log("media-controller delete /:mediaID err", err);
        res.status(500).json({error: err});
    });

  });

module.exports = router;