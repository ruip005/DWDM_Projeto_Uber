const orderStatus = require('../Models/orderStatus');
const paymentMethod = require('../Models/paymentMethod');
const paymentStatus = require('../Models/paymentStatus');
const appAdmin = require('../Models/appAdmin');
const user = require('../Models/user');
const encrypt = require('./crypt');

module.exports = verify = () => {
    console.log("A verificar coleções estáticas...")
    // Verificar se existem estados de encomenda, metodos de pagamento e estados de pagamento
    orderStatus.find()
    .then((result) => {
        if (result.length == 0) {
            const newOrderStatuses = [
                { label: 'Pendente', color: '#FFA500' },
                { label: 'Em preparação', color: '#FFA500' },
                { label: 'Em transporte', color: '#FFA500' },
                { label: 'Entregue', color: '#FFA500' },
                { label: 'Cancelado', color: '#FFA500' }
            ];

            orderStatus.insertMany(newOrderStatuses)
                .then(() => {
                    console.log('Estado de encomenda guardado com sucesso!');
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    })
    .catch((err) => {
        console.log(err);
    });

    paymentMethod.find()
    .then((result) => {
        if (result.length == 0) {
            const newPaymentMethods = [
                { label: 'Dinheiro', icon: 'https://static.vecteezy.com/system/resources/previews/019/004/926/original/money-cash-icon-png.png' },
                { label: 'MBWay', icon: 'https://seeklogo.com/images/M/mbway-logo-2CD6980569-seeklogo.com.png' },
                { label: 'Cartão de crédito', icon: 'https://w7.pngwing.com/pngs/398/306/png-transparent-credit-card-icon-money-credit-card-finance-credit-card-icon-shopping-bank-buy.png' },
                { label: 'Cartão de débito', icon: 'https://w7.pngwing.com/pngs/823/713/png-transparent-debit-card-credit-card-computer-icons-mastercard-credit-card-text-rectangle-orange.png' },
                { label: 'PayPal', icon: 'https://cdn-icons-png.flaticon.com/512/174/174861.png' }
            ];

            paymentMethod.insertMany(newPaymentMethods)
                .then(() => {
                    console.log('Método de pagamento guardado com sucesso!');
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    })
    .catch((err) => {
        console.log(err);
    });

    paymentStatus.find()
    .then((result) => {
        if (result.length == 0) {
            const newPaymentStatuses = [
                { label: 'Pendente', color: '#FFA500' },
                { label: 'Pago', color: '#FFA500' },
                { label: 'Não pago', color: '#FFA500' },
                { label: 'Reembolsado', color: '#FFA500' },
                { label: 'Cancelado', color: '#FFA500' },
                { label: 'Erro', color: '#FFA500' }
            ];

            paymentStatus.insertMany(newPaymentStatuses)
                .then(() => {
                    console.log('Estado de pagamento guardado com sucesso!');
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    })
    .catch((err) => {
        console.log(err);
    });

    user.find()
        .then((result) => {
        if (result.length == 0) {
            const newUser = new user({
                firstName: 'Rui',
                lastName: 'Rodrigues',
                email: 'ruirr31@proton.me',
                password: encrypt('admin'),
                phone: '932056753',
                address: 'Rua do Administrador',
                designation: 'Sr.',
                birthday: '08/04/2003',
                city: 'Viseu',
                state: 'Viseu',
                zip: '3500-178',
                country: 'Portugal'
            });
            newUser.save()
            .then(() => {
                console.log('Administrador da aplicação guardado com sucesso!');
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }) //

    user.find({ email: 'ruirr31@proton.me'})
    .then((userResult) => {
        if (userResult.length > 0) {
            appAdmin.find({ userId: userResult[0]._id })
                .then((adminResult) => {
                    if (adminResult.length == 0) {
                        const newAdmin = new appAdmin({
                            userId: userResult[0]._id
                        });
                        newAdmin.save()
                            .then(() => {
                                console.log('Administrador da aplicação guardado com sucesso!');
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            console.log('No user found with the provided email.');
        }
    })
    .catch((err) => {
        console.log(err);
    });
}

verify();