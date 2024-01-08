const file = require('../Models/file');
const fileContent = require('../Models/fileContent');

module.exports = (fileContentId) => {
    const isValid = mongoose.Types.ObjectId.isValid(fileContentId)
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.log(err);
        });

    if (!isValid) {
        return false;
    }

    const fileRef = file.deleteOne({ fileContentId: fileContentId })
        .then(() => {
        })
        .catch((err) => {
            console.log(err);
            return false;
        });

    const fileContentRef = fileContent.deleteOne({ _id: fileContentId })
        .then(() => {
            return true;
        })
        .catch((err) => {
            console.log(err);
            return false;
        });
}