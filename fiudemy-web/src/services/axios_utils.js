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

export const getCourseById = async (id) => {
    try {
        const res = await axios.get(`https://fiudemy.onrender.com/courses/` + id);
        if (res.status === 200) {
            return res.data;
        }
    } catch (error) {
        console.error("Error al obtener el curso:", error);
    }
}


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

export const sendMessage = async (chatId, messageData) => {
   try {
      const res = await axios.put(`https://fiudemy.onrender.com/chats/${chatId}/new_message`, messageData, {
         headers: {
            'Content-Type': 'application/json',
         },
      });
      if (res.status === 200) {
         console.log("Curso editado con éxito!");
      }
   } catch (error) {
      console.error("Error al mandar el mensaje:", error);
   }
}
export const getStudentViewedSections= async (user_id, course_id) => {
    try {
        const res = await axios.get(`https://fiudemy.onrender.com/progress?user_id=` + user_id + `&course_id=` + course_id);
        if (res.status === 200) {
            return res.data;
        }
    } catch (error) {
        console.error("Error al obtener el curso:", error);
    }
}

export const getEvaluations = async (CourseId) => {
  try {
      const res = await axios.get(`https://fiudemy.onrender.com/evaluations?=${CourseId}`);
      if (res.status === 200) {
          console.log("data api", res.data);
          return res.data;
      }
  } catch (error) {
      console.error("Error al obtener el curso:", error);
  }
}

export const getEvaluationsByUserId = async (CourseId, userId) => {
  try {
      const res = await axios.get(`https://fiudemy.onrender.com/evaluations?course_id=${CourseId}&user_id=${userId}`);
      if (res.status === 200) {
          console.log("data api", res.data);
          return res.data;
      }
  } catch (error) {
      console.error("Error al obtener el curso:", error);
  }
}

export const getAnswers = async (CourseId) => {
  try {
      const res = await axios.get(`https://fiudemy.onrender.com/evaluations?=${CourseId}`);
      if (res.status === 200) {
          return res.data;
      }
  } catch (error) {
      console.error("Error al obtener el curso:", error);
  }
}

export const saveEvaluation = async (formData) => {
    try {
      console.log(formData)
      const res = await axios.post(`https://fiudemy.onrender.com/evaluations`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.status === 201) {
        console.log("Evaluacion creada con éxito!");
      }
    } catch (error) {
      console.error("Error al crear la Evaluacion:", error);
    }
  };

export const saveStudentAnswer = async (formData, evaluationId) => {
  try {
    const res = await axios.post(`https://fiudemy.onrender.com/evaluations/${evaluationId}/answers`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 201) {
      console.log("Respuesta a evaluacion creada con éxito!");
    }
  } catch (error) {
    console.error("Error al crear la respuesta:", error);
  }
};


export const setSectionWiewStatus = async (formData, status) => {
    try {
        const url = "https://fiudemy.onrender.com/progress/" + (status === false ? "not_completed" : "completed");        console.log("url", url);
        const res = await axios.post(url, formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (res.status === 201) {
          console.log("Estado de visualizacion de seccion cambiado con éxito!");
        }
      } catch (error) {
        console.error("Error al cambiar estado de visualizacion de seccion:", error);
      }
}

