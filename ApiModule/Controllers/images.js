const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, 'uploads'); // Diretório onde as imagens serão salvas

const imageController = {
    createImage: async (id, image, res) => {
        console.log('Dados imagem: ', id, image);
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir);
        }
        try {
          // Remover o prefixo 'data:image/png;base64,'
          const imageData = Buffer.from(image.split(',')[1], 'base64');
          const fileName = `${id}.png`;
          const filePath = path.join(uploadDir, fileName);
      
          // Problema potencial aqui - garantir que 'res' seja passado corretamente
          await fs.writeFile(filePath, imageData, (err) => {
            if (err) {
              console.error('Erro ao salvar a imagem:', err);
              if (res) {
                res.status(500).json({ error: 'Erro ao salvar a imagem' });
              }
            } else {
              console.log('Imagem salva com sucesso:', filePath);
              // Adicione um retorno se necessário
              if (res) {
                res.status(200).json({ message: 'Imagem salva com sucesso' });
              }
            }
          });
        } catch (err) {
          console.error('Erro ao salvar a imagem:', err);
          if (res) {
            res.status(500).json({ error: 'Erro ao salvar a imagem' });
          }
        }
      },
      
      
      

  getImage: async (req, res) => {
    try {
      const { id } = req.params;
      const fileName = `${id}.png`;
      const filePath = path.join(uploadDir, fileName);

      const data = await fs.readFile(filePath);

      res.writeHead(200, { 'Content-Type': 'image/png' });
      res.end(data);
    } catch (err) {
      console.error('Erro ao ler a imagem:', err);
      res.status(404).json({ error: 'Imagem não encontrada' });
    }
  },
};

module.exports = imageController;
