const rating = require('../Models/rating')
const ratingComments = require('../Models/ratingComments')
const ratingContainer = require('../Models/ratingContainer')
const order = require('../Models/order')
const orderStatus = require('../Models/orderStatus')
const paymentMethod = require('../Models/paymentMethod')
const paymentStatus = require('../Models/paymentStatus')
const { createLog } = require('../Utils/Logs')

const appController = {
    
    getCommentByCampanyId: async (req, res) => {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "ID da empresa não recebido!",
            });
        }

        try {
            const getRatingInfo = await rating.find({campanyId: id});
            const getRatingComments = await ratingComments.find({ratingContainerId: getRatingInfo[0].ratingContainerId});
            
            let ratingSum = 0;
            getRatingComments.forEach(comment => { // Percorrer todas as notas e somar as estrelas
              ratingSum += comment.ratingStars;
            });
          
            const rating = Math.round(ratingSum / getRatingComments.length); 
          
            res.json({
                success: true,
                rating
            });

          } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message || "Ocorreu um erro ao obter as notas.",
            });
          }
    },

    createComment: async (req, res) => {
        const { id } = req.params;
        const { userId, userOpinion, ratingStars } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "ID da empresa não recebido!",
            });
        }

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "ID do utilizador não recebido!",
            });
        }

        if (!ratingStars) {
            return res.status(400).json({
                success: false,
                message: "Estrelas não recebidas!",
            });
        }

        try {
            const getRatingInfo = await rating.find({campanyId: id});
            const getRatingComments = await ratingComments.find({ratingContainerId: getRatingInfo[0].ratingContainerId});

            if (getRatingComments.length > 0) {
                const checkIfUserAlreadyCommented = getRatingComments.filter(comment => comment.userId == userId);

                if (checkIfUserAlreadyCommented.length > 0) {
                    return res.status(400).json({
                        success: false,
                        message: "O utilizador já comentou esta empresa!",
                    });
                }
            }

            const newComment = new ratingComments({
                userId,
                userOpinion,
                ratingContainerId: getRatingInfo[0].ratingContainerId,
                ratingStars
            });

            await newComment.save();

            await createLog('createComment', `O utilizador ${userId} comentou a empresa ${id}, com ${ratingStars} estrelas.`, userId, id, false);

            res.json({
                success: true,
                newComment,
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message || "Ocorreu um erro ao criar o comentário.",
            });
        }
    },

}

module.exports = appController