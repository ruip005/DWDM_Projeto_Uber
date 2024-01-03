const restaurante = require('../Models/restaurant');

module.exports = function(app) {
    app.get('/restaurantes', async (_, res) => {
        try {
            const restaurantes = await restaurante.find({});
            res.json(restaurantes);
        } catch (err) {
            res.status(500).send({
                message: err.message || "Ocorreu um erro ao obter os restaurantes.",
            });
        }
    });
};
