import { useEffect, useRef, useState } from 'react';

export const useFetch = (url) => {
  // Hacemos uso del useRef para evitar que quede montado
  // se deja en true porque cuando es renderizado ya debemos saber que esta siendo ejecutado
  const isMounted = useRef(true);

  const [state, setState] = useState({ data: null, loading: true, error: null });

  // Agregamos otro useeffect
  useEffect(() => {
    return () => {
      // hacemos referencia al useref
      // lo pasamos a false, con esto le diremos que vaya a ejecutar el state
      // ya que al encontrarnos en el return (se ejecuta cuando se desmonta)
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setState({ data: null, loading: true, error: null });

    const fetchData = async () => {
      await fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
          // Al validar el ref, sabremos si fue desmontado para no ejecutarlo
          // cuando no corresponde
          if (isMounted.current) {
            setState({
              loading: false,
              error: null,
              data: data,
            });
          } else {
            console.log('demosntado no ejecutado');
          }
        });
    };

    fetchData();
  }, [url]);
  return state;
};
