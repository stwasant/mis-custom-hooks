import { useState } from 'react';

export const useForm = (initialState = {}) => {
  // inicio de useState
  const [formValues, setFormValues] = useState(initialState);

  // Esta funcion lo que hace es asignar el valor que es ingresado en el formulario
  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

   // incorporamos un reset para reseter el estado del value y devolver el initialState
   const reset = () => {
    setFormValues( initialState );
  }

  // se devuelve un array pero se podria devolver un objeto tambien
  return [formValues, handleInputChange, reset];
};
