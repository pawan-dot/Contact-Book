const contact = require("../models/contact");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const ApiFeatures = require("../utils/apifeatures")





// 1.Create contact -- Admin
exports.createcontact = catchAsyncErrors(async (req, res, next) => {
    req.body.user = req.user.id;

    const contact = await contact.create(req.body);

    res.status(201).json({
        success: true,
        contact,
    });


});

//2.get all contacts

exports.getAllcontacts = catchAsyncErrors(async (req, res) => {
    const resultPerPage = 6;
    const contactsCount = await contact.countDocuments();

    //api feature like search filte etc
    const apiFeature = new ApiFeatures(contact.find(), req.query)
        .search()
        .pagination(resultPerPage);





    const contact = await apiFeature.query;//guery is got ApiFeatures


    res.status(200).json({
        success: true,
        contact,
        contactsCount,
        resultPerPage,

    });


})


//3.get one contact

exports.getOnecontact = catchAsyncErrors(async (req, res, next) => {



    const contact = await contact.findById(req.params.id);
    if (!contact) {
        return next(new ErrorHander("contact not found", 404));
    }


    res.status(200).json({
        success: true,
        contact,

    });

})
exports.updatecontact = catchAsyncErrors(async (req, res, next) => {
    let contact = await contact.findById(req.params.id);

    if (!contact) {
        return next(new ErrorHander("contact not found", 404));
    }

    contact = await contact.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        contact,
    });
});

// 5. Delete contact -- user

exports.deletecontact = catchAsyncErrors(async (req, res, next) => {
    const contact = await contact.findById(req.params.id);

    if (!contact) {
        return next(new ErrorHander("contact not found", 404));
    }

    await contact.remove();
    //we use also Use deleteOne(), deleteMany(),remove()


    res.status(200).json({
        success: true,
        message: "contact Delete Successfully",
    });
});



