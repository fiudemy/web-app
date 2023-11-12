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

export const createCourse = async (formData) => {
    try {
      console.log(formData)
      const res = await axios.post(`https://fiudemy.onrender.com/courses`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.status === 201) {
        console.log("Curso creado con éxito!");
      }
    } catch (error) {
      console.error("Error al crear el curso:", error);
    }
  };

export const editCourse = async (formData, idCourse) => {
    try {
        console.log(formData)
        const res = await axios.put(`https://fiudemy.onrender.com/courses/` +  idCourse, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (res.status === 200) {
            console.log("Curso editado con éxito!");
        }
    } catch (error) {
        console.error("Error al crear el curso:", error);
    }
};

export const getCourses = async () => {
    try {
      const res = await axios.get(`https://fiudemy.onrender.com/courses`);
      if (res.status === 200) {
        return res.data;
      }
    } catch (error) {
      console.error("Error al obtener los cursos:", error);
    }
  };

export const getChats = async () => {
   try {
      const userId = localStorage.getItem("userId");
      const res = await axios.get(`https://fiudemy.onrender.com/chats?user_id=${userId}&ascending=true`);
      if (res.status === 200) {
         return res.data;
      }
   } catch (error) {
      console.error("Error al obtener los cursos:", error);
   }
};

