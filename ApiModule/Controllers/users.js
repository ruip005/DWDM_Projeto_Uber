const user = require("../Models/user");
const apiKey = require("../Models/apiKey");
const appAdmin = require("../Models/appAdmin");
const resStaff = require("../Models/restaurantsAdmins");
const { createLog } = require("../Utils/Logs");
const { encrypt, compare } = require("../Utils/crypt");
const jwt = require("jsonwebtoken");
const { isAdmin } = require("../Utils/middleware");
const getCountry = require("../Utils/userInfo");

class User {
  constructor(
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
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.designation = designation;
    this.birthday = birthday;
    this.password = password;
    this.country = country;
    this.state = state;
    this.city = city;
    this.address = address;
  }
}

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
      name,
      email,
      phone,
      designation,
      birthday,
      password,
      country,
      state,
      city,
      address,
    } = req.body;

<<<<<<< HEAD
    console.log(req.body);
=======
    console.log(req.body)
>>>>>>> 6625290bd867cc1123f35d1e357b8ffaf753c9b6

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "Dados obrigatórios do utilizador não recebidos!",
      });
    }

    if (password < 6) {
      return res.status(400).json({
        success: false,
        message: "A password deve ter pelo menos 6 caracteres!",
      });
    }

    try {
      let [firstName, ...lastName] = name.split(" ");
      lastName = lastName.join(" ");

      const getAddress = await getCountry(req.ip);

      const utilizador = new User(
        firstName,
        lastName,
        email,
        phone,
        designation || null,
        birthday || null,
        encrypt(password),
        getAddress.countryName || null,
        getAddress.regionName || null,
        getAddress.city || null,
        getAddress.postalCode || null
      );

      if (email) {
        const existingUser = await user.findOne({ email });
        if (existingUser) {
          return res.status(409).json({
            success: false,
            message: "Email já em uso!",
          });
        } else {
          const newUser = await user.create(utilizador);
          await createLog(
            "create",
            `Utilizador ${utilizador.firstName} ${utilizador.lastName} criado com sucesso!`,
            newUser._id,
            null,
            false
          );
          res.json({
            success: true,
          });
        }
      }

      res.json({
        success: true,
      });
    } catch (err) {
      console.log(err);
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
      address,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !country ||
      !state ||
      !city
    ) {
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

      const utilizador = await user.findByIdAndUpdate(
        id,
        {
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
        },
        { new: true }
      );

      await createLog(
        "update",
        `Utilizador ${utilizador.firstName} ${utilizador.lastName} atualizado com sucesso!`,
        utilizador._id,
        null,
        false
      );

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
      if ((await isAdmin(userId)) == false) {
        return res.status(401).json({
          success: false,
          message: "Acesso negado!",
        });
      }

      const utilizadores = await user.find({}, { password: 0 });

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
      userId,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !country ||
      !state ||
      !city
    ) {
      return res.status(400).json({
        success: false,
        message: "Dados obrigatórios do utilizador não recebidos!",
      });
    }

    try {
      if ((await isAdmin(userId)) == false) {
        return res.status(401).json({
          success: false,
          message: "Acesso negado!",
        });
      }

      const utilizador = await user.findByIdAndUpdate(
        id,
        {
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
        },
        { new: true }
      );

      await createLog(
        "update",
        `[STAFF] Utilizador ${utilizador.firstName} ${utilizador.lastName} atualizado com sucesso!`,
        utilizador._id,
        null,
        false
      );

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
      if ((await isAdmin(userId)) == false) {
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

      await createLog(
        "delete",
        `[STAFF] Utilizador ${utilizador.firstName} ${utilizador.lastName} apagado com sucesso!`,
        utilizador._id,
        null,
        false
      );

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
    const { userId } = req.body;

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
      if ((await isAdmin(userId)) == false) {
        return res.status(401).json({
          success: false,
          message: "Acesso negado!",
        });
      }

      if (!isAdmin(Id)) {
        await appAdmin.deleteMany({ Id });
        const apiAuth = await apiKey.findOne({ Id });

        if (apiAuth) {
          await apiKey.deleteMany({ Id });
        }

        await createLog(
          "update",
          `[STAFF] Permissões de administrador revogadas ao utilizador ${Id} com sucesso!`,
          userId,
          null,
          false
        );

        return res.json({
          success: true,
          message: "Permissões de administrador revogadas com sucesso!",
        });
      }

      await appAdmin.create({ userId: Id });
      await apiKey.create({ Id, key: generateApiKey() });

      await createLog(
        "update",
        `[STAFF] Permissões de administrador atribuídas ao utilizador ${Id} com sucesso!`,
        userId,
        null,
        false
      );

      res.json({
        success: true,
        message: "Permissões de administrador atribuídas com sucesso!",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message:
          err.message ||
          "Ocorreu um erro ao atribuir as permissões de administrador.",
      });
    }
  },

  loginUser: async (req, res) => {
    const { username, password } = req.body;

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

    const passwordMatch = await compare(password, userExist.password);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Password incorreta!",
      });
    }

    try {
      const secret = process.env.JWT_SECRET;
      const isStaff = await resStaff.findOne({ userId: userExist._id });
      const token = await jwt.sign(
        {
          firstName: userExist.firstName,
          lastName: userExist.lastName,
          email: userExist.email,
          state: userExist.state,
          userId: userExist._id,
          address: userExist.address,
          isAdmin: await isAdmin(userExist._id),
          isStaff: isStaff ? isStaff.campanyId : null,
        },
        secret,
        { expiresIn: "7d" }
      );
      return res.json({
        success: true,
        message: "Login efetuado com sucesso!",
        token,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Erro ao gerar o token!",
      });
    }
  },

  userCheckPermissions: async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "ID do utilizador não recebido!",
      });
    }

    try {
      const utilizador = await user.findOne({ _id: userId });

      if (!utilizador) {
        return res.status(404).json({
          success: false,
          message: "Utilizador não encontrado!",
        });
      }
      //console.log(utilizador);
      let haveAdmin = await isAdmin(userId);
      let staffRecord = await resStaff.findOne({ userId });

      let haveStaff = null;
      if (staffRecord) {
        haveStaff = staffRecord.restaurantId;
      }

      return res.json({
        success: true,
        haveAdmin,
        haveStaff,
      });
    } catch (err) {
      throw err;
    }
  }, //
  /*
  searchUserFromName: async (req, res) => {
    // Procurar utilizador por nome
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Nome do utilizador não recebido!",
      });
    }

    try {
      // Procurar utilizador por nome (fristName ou lastName)
      const utilizador = await user.find({
        $or: [
          { firstName: { $regex: name, $options: "i" } },
          { lastName: { $regex: name, $options: "i" } },
        ],
      });

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
  },*/
};

module.exports = userController;

const generatorKey = () => {
  const length = 34;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let retVal = "";
  for (let i = 0; i < length; i++) {
    retVal += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return retVal;
};

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
};
