import multer from "multer";
import path from "path";
import fs from "fs";
import randomNumber from "./randomNumber.js";

 const uploadDir="storage/uploads";

if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir,{recursive:true});
}
const fileFilter= (req, file, cb) => {
  cb(null, true)
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}_${randomNumber(
      100000,
      999999
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const uploadFile = multer({ storage: storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 30
    } 

})
export default uploadFile;