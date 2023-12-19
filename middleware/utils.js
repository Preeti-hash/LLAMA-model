exports.errorHandle = async (res, err) => {
    res.json({ code: 404, error: err.message });
};

exports.buildErrObject = async (res,code, msg) => {
    res.json({ code: code, error: msg });
};
