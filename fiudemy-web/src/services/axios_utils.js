import axios from 'axios';

export const createUser = async (formData) => {
    try {
        const res = await axios.post(`https://fiudemy.onrender.com/users`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (res.status === 201) {
            console.log("Registrado!")
        }
    } catch (error) {
        console.error(error);
    }
}