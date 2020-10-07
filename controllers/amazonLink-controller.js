const router = require("express").Router();
const AmazonLink = require("../db").import("../models/amazonLink");
const {Op} = require("sequelize");
const validateSession = require("../middleware/validate-session");
const validateAdmin = require("../middleware/validate-admin");

/******************************
 ***** Get Amazon Links *********
 ******************************/
router.get("/", (req, res) => {

    const query = {where: {
        active: {[Op.eq]: true}
    }, include: {all: true, nested: true}, order: [["updatedAt", "DESC"]]};

    AmazonLink.findAll(query)
    .then((links) => {
        if (links.length > 0) {
            // console.log("amazonLink-controller get / links", links);
            res.status(200).json({links: links, resultsFound: true, message: "Successfully retrieved Amazon links."});
        } else {
            // console.log("amazonLink-controller get / No Results");
            // res.status(200).send("No Amazon links found.");
            // res.status(200).send({resultsFound: false, message: "No Amazon links found."})
            res.status(200).json({resultsFound: false, message: "No Amazon links found."});
        };
    })
    .catch((err) => {
        console.log("amazonLink-controller get / err", err);
        res.status(500).json({resultsFound: false, message: "No Amazon links found.", error: err});
    });

});

/**************************************
 ***** Get Amazon Link By AmazonLinkID *****
***************************************/
router.get("/:amazonLinkID", (req, res) => {

    const query = {where: {
        amazonLinkID: {[Op.eq]: req.params.amazonLinkID}
    }, include: {all: true, nested: true}};

    // AmazonLink.findOne(query)
    AmazonLink.findAll(query)
    .then((links) => {
        if (links.length > 0) {
            // console.log("amazonLink-controller get /:amazonLinkID link", link);
            res.status(200).json({links: links, resultsFound: true, message: "Successfully retrieved Amazon link."});
            // res.status(200).json({
            // amazonLinkID:     link.amazonLinkID,
            // ASIN:              link.ASIN,
            // textLinkShort:     link.textLinkShort,
            // textLinkFull:     link.textLinkFull,
            // imageLinkSmall:     link.imageLinkSmall,
            // imageLinkMedium:     link.imageLinkMedium,
            // imageLinkLarge:     link.imageLinkLarge,
            // textImageLink:     link.textImageLink,
            // active:     link.active,
            // message:    "Successfully retrieved Amazon link."
            // });
        } else {
            // console.log("amazonLink-controller get /:amazonLinkID No Results");
            // res.status(200).send("No Amazon links found.");
            // res.status(200).send({resultsFound: false, message: "No Amazon links found."})
            res.status(200).json({resultsFound: false, message: "No Amazon links found."});
        };
    })
    .catch((err) => {
        console.log("amazonLink-controller get /:amazonLinkID err", err);
        res.status(500).json({resultsFound: false, message: "No Amazon links found.", error: err});
    });

});

/* ******************************
 *** Add Amazon Link ***************
*********************************/
// Allows an admin to add a new Amazon link
router.post("/", validateAdmin, (req, res) => {

    const createAmazonLink = {
        ASIN:              req.body.link.ASIN,
        textLinkShort:     req.body.link.textLinkShort,
        textLinkFull:     req.body.link.textLinkFull,
        imageLinkSmall:     req.body.link.imageLinkSmall,
        imageLinkMedium:     req.body.link.imageLinkMedium,
        imageLinkLarge:     req.body.link.imageLinkLarge,
        textImageLink:     req.body.link.textImageLink
      };

      AmazonLink.create(createAmazonLink)
      .then((link) => {
        // console.log("amazonLink-controller post / link", link);
        res.status(200).json({
        amazonLinkID:     link.amazonLinkID,
        ASIN:              link.ASIN,
        textLinkShort:     link.textLinkShort,
        textLinkFull:     link.textLinkFull,
        imageLinkSmall:     link.imageLinkSmall,
        imageLinkMedium:     link.imageLinkMedium,
        imageLinkLarge:     link.imageLinkLarge,
        textImageLink:     link.textImageLink,
        active:     link.active,
        recordAdded: true,
        message:    "Amazon link successfully created."
        });
      })
      .catch((err) => {
        console.log("amazonLink-controller post / err", err);
        // console.log("amazonLink-controller post / err.name", err.name);
        // console.log("amazonLink-controller post / err.errors[0].message", err.errors[0].message);

        let errorMessages = "";
        for (let i = 0; i < err.errors.length; i++) {
            //console.log("amazonLink-controller post / err.errors[i].message", err.errors[i].message);
            if (i > 1) {
                errorMessages = errorMessages + ", ";
            };
            errorMessages = errorMessages + err.errors[i].message;
        };

        res.status(500).json({recordAdded: false, message: "Amazon link not successfully created.", errorMessages: errorMessages, error: err});
    });

});

/***************************
 ******* Update Amazon Link *******
 ***************************/
// Allows the admin to update the Amazon link including soft delete it
router.put("/:amazonLinkID", validateAdmin, (req, res) => {

    const updateAmazonLink = {
        ASIN:              req.body.link.ASIN,
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
    // Doesn't return the values of the updated record; the value passed to the function is the number of records updated.
    // .then((link) => res.status(200).json({message: link + " Amazon link record(s) successfully updated."}))
    .then((link) => {
        if (link > 0) {
            res.status(200).json({
            amazonLinkID:     req.params.amazonLinkID,
            ASIN:              req.body.link.ASIN,
            textLinkShort:     req.body.link.textLinkShort,
            textLinkFull:     req.body.link.textLinkFull,
            imageLinkSmall:     req.body.link.imageLinkSmall,
            imageLinkMedium:     req.body.link.imageLinkMedium,
            imageLinkLarge:     req.body.link.imageLinkLarge,
            textImageLink:     req.body.link.textImageLink,
            active:         req.body.link.active,
            recordUpdated: true,
            // message:    "Amazon link successfully updated."
            message: link + " Amazon link record(s) successfully updated."
            });
        } else {
            res.status(200).json({recordUpdated: false, message: link + " Amazon link record(s) successfully updated."});
        };
    })
    .catch((err) => {
        console.log("amazonLink-controller put /:amazonLinkID err", err);
        // console.log("amazonLink-controller put /:amazonLinkID err.name", err.name);
        // console.log("amazonLink-controller put /:amazonLinkID err.errors[0].message", err.errors[0].message);

        let errorMessages = "";
        for (let i = 0; i < err.errors.length; i++) {
            //console.log("amazonLink-controller put /:amazonLinkID err.errors[i].message", err.errors[i].message);
            if (i > 1) {
                errorMessages = errorMessages + ", ";
            };
            errorMessages = errorMessages + err.errors[i].message;
        };

        res.status(500).json({recordUpdated: false, message: "Amazon link not successfully updated.", errorMessages: errorMessages, error: err});
    });

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
    .then(() => res.status(200).json({recordDeleted: true, message: "Amazon link successfully deleted."}))
    .catch((err) => {
        console.log("amazonLink-controller delete /:amazonLinkID err", err);
        res.status(500).json({recordDeleted: false, message: "Amazon link not successfully deleted.", error: err});
    });

  });

module.exports = router;