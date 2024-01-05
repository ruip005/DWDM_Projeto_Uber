const user = require('../Models/user');
const apiKey = require('../Models/apiKey');
const appAdmin = require('../Models/appAdmin');

const userController = {

    getProfileById: async (req, res) => {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "ID do utilizador não recebido!",
            });
        }

        try {
            const utilizador = await user.findById(id);

            if (!utilizador) {
                return res.status(404).json({
                    success: false,
                    message: "Utilizador não encontrado!",
                });
            }

            res.json({
                success: true,
                utilizador,
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message || "Ocorreu um erro ao obter o utilizador.",
            });
        }
    },

    createUserProfile: async (req, res) => {
        const { 
            firstName, 
            lastName,
            email,
            phone,
            designation,
            birthday,
            password,
            country,
            state,
            city,
            address
        } = req.body;

        if (!firstName || !lastName || !email || !phone || !password || !country || !state || !city) {
            return res.status(400).json({
                success: false,
                message: "Dados obrigatórios do utilizador não recebidos!",
            });
        }

        try {
            const utilizador = await user.create({
                firstName, 
                lastName,
                email,
                phone,
                designation,
                birthday,
                password,
                country,
                state,
                city,
                address
            });

            res.json({
                success: true,
                utilizador,
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message || "Ocorreu um erro ao criar o utilizador.",
            });
        }
    },

    updateMyUserProfile: async (req, res) => {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "ID do utilizador não recebido!",
            });
        }

        const {
            firstName, 
            lastName,
            email,
            phone,
            designation,
            birthday,
            password,
            country,
            state,
            city,
            address
        } = req.body;

        if (!firstName || !lastName || !email || !phone || !password || !country || !state || !city) {
            return res.status(400).json({
                success: false,
                message: "Dados obrigatórios do utilizador não recebidos!",
            });
        }

        try {
            
            // Verificar se a x-api-key é válida e se coincide com o ID do utilizador
            const apiAuthKey = req.headers['x-api-key'];
            const apiKeyObj = await apiKey.findOne({key: apiAuthKey});
            if (!apiKeyObj || apiKeyObj.user != id) {
                return res.status(403).json({
                    success: false,
                    message: "A x-api-key não é válida!",
                });
            }

            const utilizador = await user.findByIdAndUpdate(id, {
                firstName, 
                lastName,
                email,
                phone,
                designation,
                birthday,
                password,
                country,
                state,
                city,
                address
            }, {new: true});

            res.json({
                success: true,
                utilizador,
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message || "Ocorreu um erro ao atualizar o utilizador.",
            });
        }
    },

    getAllUsers: async (req, res) => {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "ID do utilizador não recebido!",
            });
        }

        try {
            const imAdmin = await appAdmin.find({userId: id})

            if (!imAdmin) {
                return res.status(403).json({
                    success: false,
                    message: "Não tem permissões para aceder a esta funcionalidade!",
                });
            }


            const utilizadores = await user.find();

            res.json({
                success: true,
                utilizadores,
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message || "Ocorreu um erro ao obter os utilizadores.",
            });
        }
    },

    updateUserById: async (req, res) => {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "ID do utilizador não recebido!",
            });
        }

        const {
            firstName, 
            lastName,
            email,
            phone,
            designation,
            birthday,
            password,
            country,
            state,
            city,
            address
        } = req.body;

        if (!firstName || !lastName || !email || !phone || !password || !country || !state || !city) {
            return res.status(400).json({
                success: false,
                message: "Dados obrigatórios do utilizador não recebidos!",
            });
        }

        try {

            const utilizador = await user.findByIdAndUpdate(id, {
                firstName, 
                lastName,
                email,
                phone,
                designation,
                birthday,
                password,
                country,
                state,
                city,
                address
            }, {new: true});

            res.json({
                success: true,
                utilizador,
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message || "Ocorreu um erro ao atualizar o utilizador.",
            });
        }
    },

    deleteUserById: async (req, res) => {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "ID do utilizador não recebido!",
            });
        }

        try {
            const utilizador = await user.findByIdAndDelete(id);

            if (!utilizador) {
                return res.status(404).json({
                    success: false,
                    message: "Utilizador não encontrado!",
                });
            }

            res.json({
                success: true,
                message: "Utilizador apagado com sucesso!",
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message || "Ocorreu um erro ao apagar o utilizador.",
            });
        }
    },

    GiveOrRevokeAdminPermissions: async (req, res) => {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "ID do utilizador não recebido!",
            });
        }

        try {
            const imAdmin = await appAdmin.find({userId})

            if (imAdmin.length > 0) {
                await appAdmin.deleteMany({userId});
                const apiAuth = await apiKey.findOne({userId});

                if (apiAuth) {
                    await apiKey.deleteMany({userId});
                }

                return res.json({
                    success: true,
                    message: "Permissões de administrador revogadas com sucesso!",
                });
            }

            await appAdmin.create({userId: userId});
            await apiKey.create({userId, key: generateApiKey()});
            res.json({
                success: true,
                message: "Permissões de administrador atribuídas com sucesso!",
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message || "Ocorreu um erro ao atribuir as permissões de administrador.",
            });
        }

    },
}

module.exports = userController;

const generatorKey = () => {
    const length = 34;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let retVal = "";
    for (let i = 0; i < length; i++) {
        retVal += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return retVal;
}

const generateApiKey = async () => {
    const key = generatorKey();
    
    try {
        const isKeyUsed = await isAPIAlreadyUsed(key);
        if (isKeyUsed) {
            generateApiKey();
        } else {
            return key;
        }
    } catch (err) {
        throw err;
    }
}