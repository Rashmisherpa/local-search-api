const categoryModel = require("../models/category.model");
const keywordModel = require("../models/keyWord.model");
const businessProfileModel = require("../models/businessProfile.model");
const AdvertisementModel = require("../models/advertisement.model");
const UpdateStatus = async (req, res, next, model, query,) => {
    const { id } = req.params

    try {
        const updateStatus = await model.findByIdAndUpdate(id,
            {
                $set: [query]
            },
            { new: true }
        )
        cconsole.log(updateStatus)
        if (!updateStatus) {
            return next(ERROR(404, "there is no data with accosicate id to update!"));
        }
        res.status(201).json(updateStatus);
    } catch (err) {
        next(err)
    }
}
const businessStatus = (req, res, next) => {
    const { status } = req.query
    const changeStatus = status === "false" ? "true" : "false"
    const query = { status: changeStatus }
    console.log("query",query)
    if (status) {
        UpdateStatus(req, res, next, businessProfileModel, query)
    }

}
module.exports = { businessStatus }