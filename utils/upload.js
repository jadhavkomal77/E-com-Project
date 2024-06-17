const multer = require("multer")
const fs = require("fs")
const path = require("path")

const storage = multer.diskStorage({
    filename: (req, file, cd) => {
        const fn = Date.now() + path.extname(file.originalname)
        cd(null, fn)
    },
    destination: (req, file, cd) => {
        const dest = "uploads"
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest)
        }
        cd(null, dest)
    }
})
module.exports = multer({ storage }).single("thumb")