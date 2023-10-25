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