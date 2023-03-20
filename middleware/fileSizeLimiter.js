const file_size_limit = 8 * 1024 * 1024;

const fileSizeLimiter = (req, res, next) => {
    const files = req.files;

    const filesOverLimit = [];
    Object.keys(files).forEach(key => {
        if (files[key].size > file_size_limit) {
            filesOverLimit.push(files[key].name);
        }
    })

    if (filesOverLimit.length) {
        const properVerb = filesOverLimit.length > 1 ? 'are' : 'is';

        const sentence = `• UPLOAD FAILED: ${filesOverLimit.toString()} ${properVerb} over the file size limit of ${MB} MB.`.replaceAll("," , ", ");

        const message = filesOverLimit.length < 3
        ? sentence.replace(",", " and")
        : sentence.replace(/,(?=[^,]*$)/, " and");

        return res.status(413).json({ status: "413", message });
    }

    next();
}

module.exports = fileSizeLimiter;