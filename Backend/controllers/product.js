
const ctrl = {}

ctrl.index = (req, res, next) => {
    res.status(200).json({
        message: "get all product "
    })
}

module.exports = ctrl;