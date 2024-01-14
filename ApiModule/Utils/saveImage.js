const fileContent = require('../Models/fileContent');
const file = require('../Models/file');

module.exports = (fileContainerId, data, name, format, size) => {
    const fileC = new fileContent({
        binary: data
    });

    const savedC = fileC.save()
        .then(() => {
            console.log('Imagem guardado com sucesso!');
        })
        .catch((err) => {
            console.log(err);
        });

    const newFile = new file({
        fileName: name,
        fileFormat: format,
        fileSize: size,
        fileContainerId: fileContainerId,
        fileContentId: fileC._id
    });

    const savedF = newFile.save()
        .then(() => {
            console.log('Metadados guardados com sucesso!');
        })
        .catch((err) => {
            console.log(err);
        });

        return savedC._id;
}