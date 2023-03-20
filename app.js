const path = require("path");
const fs = require("fs");
const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const filesPayloadExists = require("./middleware/filePayloadExists");
const fileExtensionLimiter = require("./middleware/fileExtensionLimiter");
const fileSizeLimiter = require("./middleware/fileSizeLimiter");
const pathImages = path.join(__dirname, '/public/images'); 
// const images = require("./images.json");


app.use(express.static("public"));


app.get("/", (req, res) => {
    res.sendFile("./public/index.html");
});


app.get("/load", (req, res) => {
    if (fs.existsSync(pathImages)) {
        var array_files = fs.readdirSync(pathImages);
        // console.log(array_files);
        
        if (array_files.length == 0) return res.json({ status: "404", message: `• Directory is empty.` });
        else {
            const posts = [];
            var url = [];

            for (var i = 0; i < array_files.length; i++) {
                url[i] = `http://localhost:8080/images/${array_files[i]}`;
            }

            for (var i = 0; i < array_files.length; i++) {
                var item = {
                    id: i + 1,
                    title: `${array_files[i].split(".")[0]}`,
                    url: url[i]
                }
                posts.push(item);
            }

            // console.log(JSON.stringify(posts, null, "\t"));
            fs.writeFile("public/js/images.json", JSON.stringify(posts, null, "\t"), (result, err) => { if(err) console.log(err); });
            return res.json(posts);
        }
    }
});


app.post("/upload",
    fileUpload({ createParentPath: true }),
    filesPayloadExists,
    fileExtensionLimiter(['.png', '.jpg', '.jpeg', '.jfif']),
    fileSizeLimiter,
    (req, res) => {
        const files = req.files;
        console.log(files);

        Object.keys(files).forEach(key => {
            const filePath = path.join(pathImages, files[key].name);
            files[key].mv(filePath, (err) => {
                if (err) return res.status(500).json({ status: "500", message: err });
            });
        });

        return res.status(201).json({ status: "201", message: `• Uploaded: ${Object.keys(files).toString().replaceAll(",", ", ")}` });
});


app.patch("/rename", (req, res) => {
    fs.rename()
});


app.delete("/delete", (req, res) => {
    images.deleteById(req.body.id);
});


module.exports = app;