import { useState, useEffect, useRef } from 'react'

interface IFetch {
    data: any | null,
    loading: boolean,
    error? : string | null
}

const useFetch = ( url: string ) : IFetch => {
    

    const isMounted = useRef<boolean>(true)
    const [state, setState] = useState<IFetch>({ data: null, loading: true, error: null });
    
    useEffect(() => {
        return () => { isMounted.current = false };
    }, []);


    useEffect(() => {        
        setState({ data: null, loading: true, error: null });

        const fetchAsync = async () => {

            try 
            {

                let resp = await fetch(url);

                switch (resp.status) 
                {
                    case 200:
                        
                        let { data } = await resp.json();

                        isMounted.current && 
                            ( setState({ loading: false, error: null, data }) );
                        break;
                    
                    case 404:

                        setState({ loading: false, data: null,error: 'No existe la data buscada' })
                        break; 

                    case 403:

                        setState({ loading: false, data: null,error: 'Acceso denegado 403' })
                        break;    

                    default:
                        break;
                }
            }
            catch (error) 
            {
                setState(
                    {
                        data: null, 
                        loading: false, 
                        error: 'No se pudo cargar la info' 
                    }
                );            
            } 

        }

        fetchAsync();
    
    }, [url])

    return state

}

export default useFetch
