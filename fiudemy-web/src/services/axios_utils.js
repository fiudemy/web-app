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
            const fullName = `${res.data.results[0].first_name} ${res.data.results[0].last_name}`;
            console.log(fullName);
            return [userId, userRole, fullName];
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

export const createChat = async (user1, user2) => {
    try {
        const response = await axios.post(
          'https://fiudemy.onrender.com/chats',
          {
            user1,
            user2,
            messages: []
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
    
        const chatData = response.data;
        console.log('Chat creado:', chatData);
    
        return chatData;
    } catch (error) {
        console.error('Error:', error);
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
         console.log("Mensaje mandado con éxito!");
      }
   } catch (error) {
      console.error("Error al mandar el mensaje:", error);
   }
}

export const sendForumMessage = async (discussionId, messageData) => {
   try {
      const res = await axios.put(`https://fiudemy.onrender.com/forums/${discussionId}/new_message`, messageData, {
         headers: {
            'Content-Type': 'application/json',
         },
      });
      if (res.status === 200) {
         console.log("Mensaje enviado al foro con éxito!");
      }
   } catch (error) {
      console.error("Error al mandar el mensaje:", error);
   }
}

export const createNewDiscussion = async (discussionData) => {
   try {
      const res = await axios.post(`https://fiudemy.onrender.com/forums/`, discussionData, {
         headers: {
            'Content-Type': 'application/json',
         },
      });
      console.log("Discusión creada con éxito!");
      return res.data
   } catch (error) {
      console.error("Error al mandar el mensaje:", error);
   }
}

export const getUserById = async (userId) => {
    try {
        const res = await axios.get(`https://fiudemy.onrender.com/users/${userId}`);
        if (res.status === 200) {
           return res.data;
        }
    } catch (error) {
        console.error("Error al obtener la información del usuario:", error);
    }
}

export const getCoursesByTeacherEmail = async (teacherEmail) => {
    try {
        const response = await getCourses();
        if (Array.isArray(response.results)) {
            const courses = response.results;
            if (teacherEmail) {
                const filteredCourses = courses
                    .filter(course => course.teacher === teacherEmail)
                    .map(filteredCourse => ({
                    id: filteredCourse.id,
                    title: filteredCourse.title,
                    description: filteredCourse.description,
                    category : filteredCourse.category,
                    price: filteredCourse.price,
                    hours: filteredCourse.hours,
                    sections: filteredCourse.sections,
                    }));
                return filteredCourses;
            };
            return [];
        };
        return [];
    } catch (error) {
        console.error("Error al obtener los cursos del profesor");
    }   
}

export const getCoursesByStudentId = async (userId) => {
    try {
        const response = await fetch(`https://fiudemy.onrender.com/courses?user_id=${userId}`);
        if (!response.ok) {
          console.error("Error al pedir los cursos del estudiante");
        }
        const data = await response.json();
    
        if (data !== undefined) {
          return data.results;
        } else {
          return [];
        }
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getAllUsers = async () => {
    try {
        const response = await fetch(`https://fiudemy.onrender.com/users`)
        if (!response.ok) {
            console.error("Error obteniendo todos los usuarios");
        }        
        const data = await response.json();
    
        if (data !== undefined) {
        return data.results;
        } else {
        return [];
        }
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const updateUserProfilePicture = async (file) => {
    const userId = localStorage.getItem("userId");
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.put(`https://fiudemy.onrender.com/users/${userId}/profile_picture`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log('Profile picture updated:', response.data);
    } catch (error) {
        console.error('Error updating profile picture:', error);
    }
}

export const getFriendsFrom = async () => {
    const userId = localStorage.getItem("userId");
    try {
        const response = await fetch(`https://fiudemy.onrender.com/friends?from=${userId}`);
        if (!response.ok) {
            console.error("Error obteniendo todos los amigos");
        }        
        const data = await response.json();
    
        if (data !== undefined) {
            return data.results;
        } else {
            return [];
        }
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getFriendsTo = async () => {
    const userId = localStorage.getItem("userId");
    try {
        const response = await fetch(`https://fiudemy.onrender.com/friends?to=${userId}&ascending=true`);
        if (!response.ok) {
            console.error("Error obteniendo todos los amigos");
        }        
        const data = await response.json();
    
        if (data !== undefined) {
            console.log(data.results);
            return data.results;
        } else {
            return [];
        }
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const acceptFriendship = async (friendshipId) => {
    axios.post(`https://fiudemy.onrender.com/friends/${friendshipId}/accept`)
    .then(response => {
      console.log('Friend request accepted:', response.data);
    })
    .catch(error => {
      console.error('Error accepting friend request:', error);
    });
}

export const rejectFriendship = async (friendshipId) => {
    axios.post(`https://fiudemy.onrender.com/friends/${friendshipId}/reject`)
    .then(response => {
      console.log('Friend request accepted:', response.data);
    })
    .catch(error => {
      console.error('Error accepting friend request:', error);
    });
}

export const deleteFriendship = async (friendshipId) => {
    axios.delete(`https://fiudemy.onrender.com/friends/${friendshipId}`)
    .then(response => {
      console.log('Friendship deleted:', response.data);
    })
    .catch(error => {
      console.error('Error deleting friendship:', error);
    });
}

export const sendFriendRequestTo = async (friendId) => {
    const currentUserId = localStorage.getItem("userId");
    console.log("YO: ", currentUserId);
    console.log("Friend: ", friendId);
    axios.post(
        'https://fiudemy.onrender.com/friends',
        {
            from: currentUserId,
            to: friendId
        },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )
    .then(response => {
        console.log('Friend request created:', response.data);
    })
    .catch(error => {
        console.error('Error creating friend request:', error);
    });
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
        return res.data;
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

export const saveTeacherResponse = async (formData, evaluationId, studentId) => {
  try {
      console.log(formData)
      const res = await axios.put(`https://fiudemy.onrender.com/evaluations/${evaluationId}/answers/${studentId}`, formData, {
          headers: {
              'Content-Type': 'application/json',
          },
      });
      if (res.status === 200) {
          console.log("Respuesta a evaluacion creada con éxito!");
      }
  } catch (error) {
      console.error("Error al crear la respuesta:", error);
  }
};

export const getForumData = async (courseId) => {
   try {
      const res = await axios.get(`https://fiudemy.onrender.com/forums?course_id=${courseId}&ascending=true`);
      if (res.status === 200) {
         return res.data;
      }
   } catch (error) {
      console.error("Error al obtener los cursos:", error);
   }
};


export const saveEvaluationFile = async (formData, evaluationId) => {
    try {
        
        const response = await axios.post(`https://fiudemy.onrender.com/evaluations/${evaluationId}/file`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log('evaluation file updated:', response.data);
    } catch (error) {
        console.error('Error updating evaluation file:', error);
    }
}
