const router = require('express').Router();
const Edition = require('../db').import('../models/edition');
const AmazonLink = require('../db').import('../models/amazonLink');
const validateSession = require("../middleware/validate-session");
const validateAdmin = require("../middleware/validate-admin");


/******************************
 ***** Get Editions *********
 ******************************/
router.get("/", (req, res) => {

    const query = {where: {
        active: {[Op.eq]: true}
    }};

    const orderBy = {order: 
        [["publicationDate", 'DESC']]
    };
   
    Edition.findAll(query, orderBy)
      .then((editions) => res.status(200).json({
        editionID:  editions.editionID,
        titleID:    editions.titleID,
        mediaID:    editions.mediaID,
        amazonLinkID:   editions.amazonLinkID,
        publicationDate:  editions.publicationDate,
        imageName:  editions.imageName,
        textLinkShort:     editions.textLinkShort,
        textLinkFull:     editions.textLinkFull,
        imageLinkSmall:     editions.imageLinkSmall,
        imageLinkMedium:     editions.imageLinkMedium,
        imageLinkLarge:     editions.imageLinkLarge,
        textImageLink:     editions.textImageLink,
        active:     editions.active,
        message:    'Successfully retrieved editions.'
    }))
      .catch((err) => res.status(500).json({error: err}));

});

/**************************************
 ***** Get Edition By EditionID *****
***************************************/
router.get("/:editionID", (req, res) => {

    const query = {where: {
        editionID: {[Op.eq]: req.params.editionID}
    }};

    Edition.findOne(query)
    .then((edition) => res.status(200).json({
        editionID:  edition.editionID,
        titleID:    edition.titleID,
        mediaID:    edition.mediaID,
        amazonLinkID:   edition.amazonLinkID,
        publicationDate:  edition.publicationDate,
        imageName:  editions.imageName,
        textLinkShort:     editions.textLinkShort,
        textLinkFull:     editions.textLinkFull,
        imageLinkSmall:     editions.imageLinkSmall,
        imageLinkMedium:     editions.imageLinkMedium,
        imageLinkLarge:     editions.imageLinkLarge,
        textImageLink:     editions.textImageLink,
        active:     edition.active,
        message:    'Successfully retrieved edition.'
        }))
    .catch((err) => res.status(500).json({error: err}));

});

/**************************************
 ***** Get Editions By TitleID *****
***************************************/
router.get("/title/:titleID", (req, res) => {

    const query = {where: {
        [Op.and]: [
            {titleID: {[Op.eq]: req.params.titleID}},
            {active: {[Op.eq]: true}}
            ]
    }};

    const orderBy = {order: 
        [["publicationDate", 'DESC']]
    };

    Edition.findAll(query, orderBy)
    .then((editions) => res.status(200).json({
        editionID:  editions.editionID,
        titleID:    editions.titleID,
        mediaID:    editions.mediaID,
        amazonLinkID:   editions.amazonLinkID,
        publicationDate:  editions.publicationDate,
        imageName:  editions.imageName,
        textLinkShort:     editions.textLinkShort,
        textLinkFull:     editions.textLinkFull,
        imageLinkSmall:     editions.imageLinkSmall,
        imageLinkMedium:     editions.imageLinkMedium,
        imageLinkLarge:     editions.imageLinkLarge,
        textImageLink:     editions.textImageLink,
        active:     editions.active,
        message:    'Successfully retrieved editions.'
        }))
    .catch((err) => res.status(500).json({error: err}));

});
  
/**************************************
 ***** Get Editions By MediaID *****
***************************************/
router.get("/media/:mediaID", (req, res) => {

    const query = {where: {
        [Op.and]: [
            {mediaID: {[Op.eq]: req.params.mediaID}},
            {active: {[Op.eq]: true}}
            ]
    }};

    const orderBy = {order: 
        [["publicationDate", 'DESC']]
    };

    Edition.findAll(query, orderBy)
    .then((editions) => res.status(200).json({
        editionID:  editions.editionID,
        titleID:    editions.titleID,
        mediaID:    editions.mediaID,
        amazonLinkID:   editions.amazonLinkID,
        publicationDate:  editions.publicationDate,
        imageName:  editions.imageName,
        textLinkShort:     editions.textLinkShort,
        textLinkFull:     editions.textLinkFull,
        imageLinkSmall:     editions.imageLinkSmall,
        imageLinkMedium:     editions.imageLinkMedium,
        imageLinkLarge:     editions.imageLinkLarge,
        textImageLink:     editions.textImageLink,
        active:     editions.active,
        message:    'Successfully retrieved editions.'
        }))
    .catch((err) => res.status(500).json({error: err}));

});
  
/**************************************
 ***** Get Editions By CategoryID *****
***************************************/
// Needed? Use Get Titles instead?
// Query needs to be changed to work
router.get("/category/:categoryID", (req, res) => {

    const query = {where: {
        [Op.and]: [
            {categoryID: {[Op.eq]: req.params.categoryID}},
            {active: {[Op.eq]: true}}
            ]
    }};

    const orderBy = {order: 
        [["publicationDate", 'DESC']]
    };

    Edition.findAll(query, orderBy)
    .then((editions) => res.status(200).json({
        editionID:  editions.editionID,
        titleID:    editions.titleID,
        mediaID:    editions.mediaID,
        amazonLinkID:   editions.amazonLinkID,
        publicationDate:  editions.publicationDate,
        imageName:  editions.imageName,
        textLinkShort:     editions.textLinkShort,
        textLinkFull:     editions.textLinkFull,
        imageLinkSmall:     editions.imageLinkSmall,
        imageLinkMedium:     editions.imageLinkMedium,
        imageLinkLarge:     editions.imageLinkLarge,
        textImageLink:     editions.textImageLink,
        active:     editions.active,
        message:    'Successfully retrieved editions.'
        }))
    .catch((err) => res.status(500).json({error: err}));

});

/* ******************************
 *** Add Edition ***************
*********************************/
// Allows an admin to add a new edition
router.post('/', validateAdmin, (req, res) => {

    const createEdition = {
        titleID:    req.body.edition.titleID,
        mediaID:    req.body.edition.mediaID,
        amazonLinkID:   req.body.edition.amazonLinkID,
        publicationDate:  req.body.edition.publicationDate,
        imageName:  req.body.edition.imageName,
        textLinkShort:     req.body.edition.textLinkShort,
        textLinkFull:     req.body.edition.textLinkFull,
        imageLinkSmall:     req.body.edition.imageLinkSmall,
        imageLinkMedium:     req.body.edition.imageLinkMedium,
        imageLinkLarge:     req.body.edition.imageLinkLarge,
        textImageLink:     req.body.edition.textImageLink,
        active:     req.body.edition.active
      };

      Edition.create(createEdition)
      .then((edition) => res.status(200).json({
        editionID:  edition.editionID,
        titleID:    edition.titleID,
        mediaID:    edition.mediaID,
        amazonLinkID:   edition.amazonLinkID,
        publicationDate:  edition.publicationDate,
        imageName:  edition.imageName,
        textLinkShort:     edition.textLinkShort,
        textLinkFull:     edition.textLinkFull,
        imageLinkSmall:     edition.imageLinkSmall,
        imageLinkMedium:     edition.imageLinkMedium,
        imageLinkLarge:     edition.imageLinkLarge,
        textImageLink:     edition.textImageLink,
        active:     edition.active,
        message:    'Edition successfully created.'
    }))
    .catch(err => res.status(500).json({error: err}))
});

/***************************
 ******* Update Edition *******
 ***************************/
// Allows the admin to update the edition including soft delete it
router.put("/:editionID", validateAdmin, (req, res) => {

    const updateEdition = {
        titleID:    req.body.edition.titleID,
        mediaID:    req.body.edition.mediaID,
        amazonLinkID:   req.body.edition.amazonLinkID,
        publicationDate:  req.body.edition.publicationDate,
        imageName:  req.body.edition.imageName,
        textLinkShort:     req.body.edition.textLinkShort,
        textLinkFull:     req.body.edition.textLinkFull,
        imageLinkSmall:     req.body.edition.imageLinkSmall,
        imageLinkMedium:     req.body.edition.imageLinkMedium,
        imageLinkLarge:     req.body.edition.imageLinkLarge,
        textImageLink:     req.body.edition.textImageLink,
        active:     req.body.edition.active
      };

      const query = {where: {
        editionID: {[Op.eq]: req.params.editionID}
    }};

    Edition.update(updateEdition, query)
    .then((edition) => res.status(200).json({
        editionID:  edition.editionID,
        titleID:    edition.titleID,
        mediaID:    edition.mediaID,
        amazonLinkID:   edition.amazonLinkID,
        publicationDate:  edition.publicationDate,
        imageName:  edition.imageName,
        textLinkShort:     edition.textLinkShort,
        textLinkFull:     edition.textLinkFull,
        imageLinkSmall:     edition.imageLinkSmall,
        imageLinkMedium:     edition.imageLinkMedium,
        imageLinkLarge:     edition.imageLinkLarge,
        textImageLink:     edition.textImageLink,
        active:     edition.active,
        message:    'Edition successfully updated.'
    }))
    .catch((err) => res.status(500).json({error: err}));

  });

/***************************
 ******* Delete Edition *******
 ***************************/
// Allows an admin to hard delete an edition
router.delete("/:editionID", validateAdmin, (req, res) => {

    const query = {where: {
        editionID: {[Op.eq]: req.params.editionID}
    }};

    Edition.destroy(query)
    .then(() => res.status(200).send("Edition successfully deleted."))
    .catch((err) => res.status(500).json({error: err}));

  });

module.exports = router;