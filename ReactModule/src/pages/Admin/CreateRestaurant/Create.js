import React, { useState } from 'react';
import RestaurantesList from '../../Restaurantes/RestaurantesLista';
import { useEffect } from 'react';

function CreateRestaurant({ setRestaurantesLista }) {
    const [name, setName] = useState('');
    const [logo, setLogo] = useState('');
    const [workingHours, setWorkingHours] = useState({
        Segunda: { opening: '', closing: '', isClosingDay: false },
        Terça: { opening: '', closing: '', isClosingDay: false },
        Quarta: { opening: '', closing: '', isClosingDay: false },
        Quinta: { opening: '', closing: '', isClosingDay: false },
        Sexta: { opening: '', closing: '', isClosingDay: false },
        Sabado: { opening: '', closing: '', isClosingDay: false },
        Domingo: { opening: '', closing: '', isClosingDay: false },
    });
    
    useEffect(() => {
        console.log(setRestaurantesLista);
      }, [setRestaurantesLista]);
      
    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleLogoChange = (event) => {
        setLogo(event.target.value);
    };

    const handleWorkingHoursChange = (day, type, value) => {
        setWorkingHours((prevWorkingHours) => ({
            ...prevWorkingHours,
            [day]: {
                ...prevWorkingHours[day],
                [type]: value,
            },
        }));
    };

    const handleClosingDayChange = (day, value) => {
        setWorkingHours((prevWorkingHours) => ({
            ...prevWorkingHours,
            [day]: {
                ...prevWorkingHours[day],
                isClosingDay: value,
                closing: '', // Reset closing hours when it's a closing day
            },
        }));
    };

    const createRestaurant = () => {
        // Check if every input is filled or checkbox is checked
        for (const day in workingHours) {
            const opening = workingHours[day].opening;
            const closing = workingHours[day].closing;

            if (!workingHours[day].isClosingDay && (opening === '' || closing === '')) {
                alert(`Please fill in opening and closing hours on ${day}.`);
                return;
            }
        }

        // Additional check for name and logo
        if (name === '' || logo === '') {
            alert('Please fill in restaurant name and logo.');
            return;
        }

        // Validation check for numeric input and opening hours less than closing hours
        for (const day in workingHours) {
            const opening = workingHours[day].opening;
            const closing = workingHours[day].closing;

            if (!workingHours[day].isClosingDay && (!/^\d+$/.test(opening) || parseInt(opening) > 24)) {
                alert(`Please enter a valid numeric value less than or equal to 24 for opening hours on ${day}.`);
                return;
            }

            if (!workingHours[day].isClosingDay && (!/^\d+$/.test(closing) || parseInt(closing) > 24)) {
                alert(`Please enter a valid numeric value less than or equal to 24 for closing hours on ${day}.`);
                return;
            }

            if (!workingHours[day].isClosingDay && opening !== '' && closing !== '' && parseInt(opening) >= parseInt(closing)) {
                alert(`Closing hours should be greater than opening hours on ${day}.`);
                return;
            }
        }

        // Create new restaurant object
        const newRestaurant = {
            id: `A--${Date.now()}`, // Unique ID for the new restaurant
            name,
            image: logo,
            workingDays: {
                Segunda: {
                    openingHours: workingHours.Segunda.opening,
                    closingHours: workingHours.Segunda.closing,
                },
                Terça: {
                    openingHours: workingHours.Terça.opening,
                    closingHours: workingHours.Terça.closing,
                },
                Quarta: {
                    openingHours: workingHours.Quarta.opening,
                    closingHours: workingHours.Quarta.closing,
                },
                Quinta: {
                    openingHours: workingHours.Quinta.opening,
                    closingHours: workingHours.Quinta.closing,
                },
                Sexta: {
                    openingHours: workingHours.Sexta.opening,
                    closingHours: workingHours.Sexta.closing,
                },
                Sabado: {
                    openingHours: workingHours.Sabado.opening,
                    closingHours: workingHours.Sabado.closing,
                },
                Domingo: {
                    openingHours: workingHours.Domingo.opening,
                    closingHours: workingHours.Domingo.closing,
                },
            },
            closingDays: {
                Domingo: workingHours.Domingo.isClosingDay,
            },
        };

        // Update the RestaurantesLista state using the callback function
        setRestaurantesLista((prevRestaurantes) => [...prevRestaurantes, newRestaurant]);

        console.log('RestaurantesList:', [...RestaurantesList, newRestaurant]);
        console.log('Creating restaurant:', newRestaurant);
        alert('Restaurant created successfully!');
    };
    

    return (
        <div>
            <input type="text" value={name} onChange={handleNameChange} placeholder="Restaurant Name" />
            <p />
            <input type="text" value={logo} onChange={handleLogoChange} placeholder="Logo URL" />
            <p />

            {/* Input fields for working hours */}
            {Object.keys(workingHours).map((day) => (
                <div key={day}>
                    <label>{day.charAt(0).toUpperCase() + day.slice(1)}:</label>
                    <input
                        type="text"
                        value={workingHours[day].opening}
                        onChange={(e) => handleWorkingHoursChange(day, 'opening', e.target.value)}
                        placeholder="Opening"
                        disabled={workingHours[day].isClosingDay}
                    />
                    <input
                        type="text"
                        value={workingHours[day].closing}
                        onChange={(e) => handleWorkingHoursChange(day, 'closing', e.target.value)}
                        placeholder="Closing"
                        disabled={workingHours[day].isClosingDay}
                    />
                    <label>
                        Closing Day:
                        <input
                            type="checkbox"
                            checked={workingHours[day].isClosingDay}
                            onChange={(e) => handleClosingDayChange(day, e.target.checked)}
                        />
                    </label>
                </div>
            ))}

            <button onClick={createRestaurant}>Create Restaurant</button>
        </div>
    );
}

export default CreateRestaurant;
