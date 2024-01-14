const user = require('../Models/user');
const apiKey = require('../Models/apiKey');
const appAdmin = require('../Models/appAdmin');
const { createLog } = require('../Utils/Logs');
const encrypt = require('../Utils/crypt');
const jwt = require('jsonwebtoken');
const { isAdmin } = require('../Utils/middleware');

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

            await createLog('create', `Utilizador ${utilizador.firstName} ${utilizador.lastName} criado com sucesso!`, utilizador._id, null, false);

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
        const { userId } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "ID do utilizador não recebido!",
            });
        }

        if (userId != id) {
            return res.status(401).json({
                success: false,
                message: "Acesso negado!",
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
            
            /* Verificar se a x-api-key é válida e se coincide com o ID do utilizador
            const apiAuthKey = req.headers['x-api-key'];
            const apiKeyObj = await apiKey.findOne({key: apiAuthKey});
            if (!apiKeyObj || apiKeyObj.user != id) {
                return res.status(403).json({
                    success: false,
                    message: "A x-api-key não é válida!",
                });
            }*/

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

            await createLog('update', `Utilizador ${utilizador.firstName} ${utilizador.lastName} atualizado com sucesso!`, utilizador._id, null, false);

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
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "ID não recebido!",
            });
        }

        try {
            if (!isAdmin(userId)) {
                return res.status(401).json({
                    success: false,
                    message: "Acesso negado!",
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
            address,
            userId
        } = req.body;

        if (!firstName || !lastName || !email || !phone || !password || !country || !state || !city) {
            return res.status(400).json({
                success: false,
                message: "Dados obrigatórios do utilizador não recebidos!",
            });
        }

        try {

            if (!isAdmin(userId)) {
                return res.status(401).json({
                    success: false,
                    message: "Acesso negado!",
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

            await createLog('update', `[STAFF] Utilizador ${utilizador.firstName} ${utilizador.lastName} atualizado com sucesso!`, utilizador._id, null, false);

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

        if (id == process.env.MASTER_USER) {
            return res.status(403).json({
                success: false,
                message: "Não é possível apagar o utilizador master!",
            });
        }

        const { userId } = req.body;

        try {

            if (!isAdmin(userId)) {
                return res.status(401).json({
                    success: false,
                    message: "Acesso negado!",
                });
            }

            const utilizador = await user.findByIdAndDelete(id);

            if (!utilizador) {
                return res.status(404).json({
                    success: false,
                    message: "Utilizador não encontrado!",
                });
            }

            await createLog('delete', `[STAFF] Utilizador ${utilizador.firstName} ${utilizador.lastName} apagado com sucesso!`, utilizador._id, null, false);

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
        const { Id } = req.params;
        const { userId} = req.body;

        if (!Id || !userId) {
            return res.status(400).json({
                success: false,
                message: "ID do utilizador não recebido!",
            });
        }

        if (Id == process.env.MASTER_USER) {
            return res.status(403).json({
                success: false,
                message: "Não é possível alterar as permissões do utilizador master!",
            });
        }

        try {
            if (!isAdmin(userId)) {
                return res.status(401).json({
                    success: false,
                    message: "Acesso negado!",
                });
            }

            if (!isAdmin(Id)) {

                await appAdmin.deleteMany({Id});
                const apiAuth = await apiKey.findOne({Id});

                if (apiAuth) {
                    await apiKey.deleteMany({Id});
                }

                await createLog('update', `[STAFF] Permissões de administrador revogadas ao utilizador ${Id} com sucesso!`, userId, null, false);

                return res.json({
                    success: true,
                    message: "Permissões de administrador revogadas com sucesso!",
                });
            
            }

            await appAdmin.create({userId: Id});
            await apiKey.create({Id, key: generateApiKey()});

            await createLog('update', `[STAFF] Permissões de administrador atribuídas ao utilizador ${Id} com sucesso!`, userId, null, false);

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

    loginUser: async (req, res) => {
        const { 
            username, 
            password 
        } = req.body;

        if (!username || !password) {
            return res.status(422).json({
                success: false,
                message: "Dados obrigatórios do utilizador não recebidos!",
            });
        }

        const userExist = await user.findOne({ email: username });

        if (!userExist) {
            return res.status(404).json({
                success: false,
                message: "Utilizador não encontrado!",
            });
        }

        const passwordMatch = await encrypt.compare(password, userExist.password);

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Password incorreta!",
            });
        }

        try {    
            const secret = process.env.JWT_SECRET;
            const token = jwt.sign({ id: user._id }, secret,); 
        } catch (err) {
            console.log(err)
        }
    }
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