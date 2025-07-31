const Joi = require('joi');

// module.exports.listingSchema = Joi.object({
//     listing: Joi.object({
//         title: Joi.string().required(),
//         description: Joi.string().required(),
//         location: Joi.string().required(),
//         country: Joi.string().required(),
//         price: Joi.number().required().min(0),
//         image: Joi.string().allow("", null),
//     }).required()
// });

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().allow("", null), // Allow empty string or null for image URL
        price: Joi.number().required().min(0),
        location: Joi.string().required(),
        country: Joi.string().required(),
        // Add validation for the category field
        category: Joi.string().valid(
            "mountains", "arctic", "camping", "trending",
            "rooms", "iconic_Cities", "castles", "pools", "farms"
        ).required() // Allow empty string or null if not required on new listing creation
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required(),
});
