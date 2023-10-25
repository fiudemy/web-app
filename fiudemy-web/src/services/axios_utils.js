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

export const logIn = async (email) => {
    try {
        const res =
            await axios.get(`https://fiudemy.onrender.com/users?email=` + email + `&ascending=true`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (res.status === 200) {
            const userId = res.data.results[0].id;
            const userRole = res.data.results[0].role;
            return [userId, userRole];
        }
    } catch (error) {
        console.error(error);
    }
}