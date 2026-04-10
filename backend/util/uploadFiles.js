import multer from "multer";
import path from "path";
import fs from "fs";

 const uploadDir="storage/uploads";

if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir,{recursive:true});
}
const fileFilter= (req, file, cb) => {
  cb(null, true)
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename(req, file, cb) {

    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueSuffix)
  }
})

const uploadFile = multer({ storage: storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 30
    } 

})
export default uploadFile;