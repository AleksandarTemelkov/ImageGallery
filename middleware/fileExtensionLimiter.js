const path = require("path");

const fileExtensionLimiter = (allowedExtArray) => {
    return (req, res, next) => {
        const files = req.files;
        const fileExtensions = [];

        Object.keys(files).forEach(key => {
            fileExtensions.push(path.extname(files[key].name))
        });

        const allowed = fileExtensions.every(ext => allowedExtArray.includes(ext));

        if (!allowed) {
            const message = `• UPLOAD FAILED: Only ${allowedExtArray.toString()} files allowed.`.replaceAll(",", ", ");

            return res.status(415).json({ status: "415", message });
        }

        next();
    }
}

module.exports = fileExtensionLimiter;