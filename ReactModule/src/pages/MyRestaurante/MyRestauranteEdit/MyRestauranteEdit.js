import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function MyRestauranteEdit() {
    // Obtém o ID do restaurante dos parâmetros da URL
    const { restaurantId } = useParams();
    // Função para navegação programática
    const Navigate = useNavigate();
    // Estado para armazenar os dados do novo restaurante
    const [newRestaurant, setRestaurant] = useState({});

    // Função para lidar com mudanças nas horas de funcionamento
    const handleBusinessHoursChange = (day, type, value) => {
        setRestaurant((prevRestaurant) => {
            const updatedHours = { ...prevRestaurant.businessHours };
            updatedHours[day][type] = value;
            return { ...prevRestaurant, businessHours: updatedHours };
        });
    };

    // Função para lidar com mudanças no checkbox para dias de fechamento
    const handleCheckboxChange = (day) => {
        setRestaurant((prevRestaurant) => {
            const updatedClosingDays = { ...prevRestaurant.closingDays };
            updatedClosingDays[day] = !updatedClosingDays[day];
            const updatedBusinessHours = { ...prevRestaurant.businessHours };
            if (updatedClosingDays[day]) {
                updatedBusinessHours[day] = { open: "", close: "" };
            }
            return {
                ...prevRestaurant,
                closingDays: updatedClosingDays,
                businessHours: updatedBusinessHours,
            };
        });
    };

    // Função para lidar com a atualização do restaurante
    const handleEditar = async () => {
        try {
            // Registra o payload antes de enviar a solicitação
            console.log("Payload da Requisição:", newRestaurant);
            const token = localStorage.getItem("token");
            const url = `http://localhost:9000/admin/restaurants/${restaurantId}`;

            const response = await axios.put(
                url,
                newRestaurant,
                {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Atualiza o estado com os dados do restaurante atualizados
            const data = response.data.restaurante;
            setRestaurant(data);
        } catch (error) {
            console.error("Erro ao atualizar o restaurante:", error);
        }
    };

    // Efeito para buscar os dados do restaurante ao carregar o componente
    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const token = localStorage.getItem("token");
                const url = `http://localhost:9000/user/restaurants/${restaurantId}`;
                const response = await axios.get(url, {
                    headers: {
                        Authorization: token,
                    },
                    params: {
                        id: restaurantId,
                    },
                });
                // Atualiza o estado com os dados do restaurante obtidos
                const data = response.data.restaurante;
                setRestaurant(data || {});
            } catch (error) {
                console.error("Erro ao buscar os dados do restaurante:", error);
            }
        };

        fetchRestaurants();
    }, [restaurantId]); // Executa apenas quando o restaurantId muda

    return (
        <div className="container">
            <div className="MyRestaurante-Name">
                {/* Exibe o nome do restaurante e a imagem do logo */}
                <h1>{newRestaurant.campanyName}<img src={newRestaurant && `http://localhost:9000/system/image/${newRestaurant._id}`} className='MyRestaurant-Logo' /></h1>
            </div>
            <div className="MyRestaurante-Info">
                <h3>Horário de Funcionamento</h3>
                {/* Mapeia os dias da semana e exibe os campos de entrada para o horário de funcionamento */}
                {Object.keys(newRestaurant.businessHours || {}).map((day) => (
                    <div key={day}>
                        <label>
                            {day}:
                            <input
                                type="number"
                                min="0"
                                max="24"
                                value={(newRestaurant.businessHours && newRestaurant.businessHours[day]?.open) || ''}
                                onChange={(e) =>
                                    handleBusinessHoursChange(day, 'open', e.target.value)
                                }
                                placeholder="Aberto"
                                disabled={newRestaurant.closingDays && newRestaurant.closingDays[day]}
                            />
                            <input
                                type="number"
                                min="0"
                                max="24"
                                value={(newRestaurant.businessHours && newRestaurant.businessHours[day]?.close) || ''}
                                onChange={(e) =>
                                    handleBusinessHoursChange(day, 'close', e.target.value)
                                }
                                placeholder="Fechado"
                                disabled={newRestaurant.closingDays && newRestaurant.closingDays[day]}
                            />
                            <label>
                                Dia de Fechamento:
                                <input
                                    type="checkbox"
                                    onChange={() => handleCheckboxChange(day)}
                                    checked={
                                        newRestaurant.businessHours[day]?.open === '' &&
                                        newRestaurant.businessHours[day]?.close === ''
                                    }
                                />
                            </label>
                        </label>
                    </div>
                ))}
            </div>
            {/* Botão para acionar a função de edição */}
            <button onClick={handleEditar}>Editar</button>
            <p />
            {/* Botão para voltar à página anterior */}
            <button onClick={() => Navigate(-1)}>Voltar</button>
        </div>
    );
}

export default MyRestauranteEdit;
