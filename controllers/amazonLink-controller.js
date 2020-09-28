const router = require('express').Router();
const AmazonLink = require('../db').import('../models/amazonLink');
const validateSession = require("../middleware/validate-session");
const validateAdmin = require("../middleware/validate-admin");



/******************************
 ***** Get Amazon Links *********
 ******************************/
router.get("/", (req, res) => {

    const query = {where: {
        active: {[Op.eq]: true}
    }};
  
    const orderBy = {order: 
        [["updatedAt", 'DESC']]
    };

    AmazonLink.findAll(query, orderBy)
      .then((links) => res.status(200).json({
        amazonLinkID:     links.amazonLinkID,
        textLinkShort:     links.textLinkShort,
        textLinkFull:     links.textLinkFull,
        imageLinkSmall:     links.imageLinkSmall,
        imageLinkMedium:     links.imageLinkMedium,
        imageLinkLarge:     links.imageLinkLarge,
        textImageLink:     links.textImageLink,
        active:     links.active,
        message:    'Successfully retrieved Amazon links.'
    }))
      .catch((err) => res.status(500).json({error: err}));

});

/**************************************
 ***** Get Amazon Link By AmazonLinkID *****
***************************************/
router.get("/:amazonLinkID", (req, res) => {

    const query = {where: {
        amazonLinkID: {[Op.eq]: req.params.amazonLinkID}
    }};

    AmazonLink.findOne(query)
    .then((link) => res.status(200).json({
        amazonLinkID:     link.amazonLinkID,
        textLinkShort:     link.textLinkShort,
        textLinkFull:     link.textLinkFull,
        imageLinkSmall:     link.imageLinkSmall,
        imageLinkMedium:     link.imageLinkMedium,
        imageLinkLarge:     link.imageLinkLarge,
        textImageLink:     link.textImageLink,
        active:     link.active,
        message:    'Successfully retrieved Amazon link.'
        }))
    .catch((err) => res.status(500).json({error: err}));

});

/* ******************************
 *** Add Amazon Link ***************
*********************************/
// Allows an admin to add a new Amazon link
router.post('/', validateAdmin, (req, res) => {

    const createAmazonLink = {
        textLinkShort:     req.body.link.textLinkShort,
        textLinkFull:     req.body.link.textLinkFull,
        imageLinkSmall:     req.body.link.imageLinkSmall,
        imageLinkMedium:     req.body.link.imageLinkMedium,
        imageLinkLarge:     req.body.link.imageLinkLarge,
        textImageLink:     req.body.link.textImageLink,
        active:         req.body.link.active
      };

      AmazonLink.create(createAmazonLink)
      .then((link) => res.status(200).json({
        amazonLinkID:     link.amazonLinkID,
        textLinkShort:     link.textLinkShort,
        textLinkFull:     link.textLinkFull,
        imageLinkSmall:     link.imageLinkSmall,
        imageLinkMedium:     link.imageLinkMedium,
        imageLinkLarge:     link.imageLinkLarge,
        textImageLink:     link.textImageLink,
        active:     link.active,
        message:    'Amazon link successfully created.'
    }))
    .catch(err => res.status(500).json({error: err}))
});

/***************************
 ******* Update Amazon Link *******
 ***************************/
// Allows the admin to update the Amazon link including soft delete it
router.put("/:amazonLinkID", validateAdmin, (req, res) => {

    const updateAmazonLink = {
        textLinkShort:     req.body.link.textLinkShort,
        textLinkFull:     req.body.link.textLinkFull,
        imageLinkSmall:     req.body.link.imageLinkSmall,
        imageLinkMedium:     req.body.link.imageLinkMedium,
        imageLinkLarge:     req.body.link.imageLinkLarge,
        textImageLink:     req.body.link.textImageLink,
        active:         req.body.link.active
      };

      const query = {where: {
        amazonLinkID: {[Op.eq]: req.params.amazonLinkID}
    }};

    AmazonLink.update(updateAmazonLink, query)
    .then((link) => res.status(200).json({
        amazonLinkID:     link.amazonLinkID,
        textLinkShort:     link.textLinkShort,
        textLinkFull:     link.textLinkFull,
        imageLinkSmall:     link.imageLinkSmall,
        imageLinkMedium:     link.imageLinkMedium,
        imageLinkLarge:     link.imageLinkLarge,
        textImageLink:     link.textImageLink,
        active:     link.active,
        message:    'Amazon link successfully updated.'
    }))
    .catch((err) => res.status(500).json({error: err}));

  });

/***************************
 ******* Delete Amazon Link *******
 ***************************/
// Allows an admin to hard delete an Amazon link
router.delete("/:amazonLinkID", validateAdmin, (req, res) => {

    const query = {where: {
        amazonLinkID: {[Op.eq]: req.params.amazonLinkID}
    }};

    AmazonLink.destroy(query)
    .then(() => res.status(200).send("Amazon link successfully deleted."))
    .catch((err) => res.status(500).json({error: err}));

  });

module.exports = router;