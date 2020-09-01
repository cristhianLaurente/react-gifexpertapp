import React, { useEffect } from 'react'
import useFetch from '../hooks/useFetch'
import { useState } from 'react';
import GifGridItem from './GifGridItem';

interface IGigsImages {
    downsized_medium: {
        url: string
    }
}

interface IGifs {
    id: string,
    title: string,
    images: IGigsImages
}

export interface IGifItem {
    id: string,
    title: string,
    url: string
}

const GifGrid : React.FC<{ category: string }> = ({ category }) => {
    
    
    const url = `https://api.giphy.com/v1/gifs/search?q=${ encodeURI(category) }&limit=10&api_key=xBadCRbv5MJ1tboOS6COSGaDaoDEnk80`
    
    const { loading, error, data } = useFetch(url);

    const [images, setImages] = useState< IGifItem[] >([]);


    useEffect(() => {

        if ( !loading && data !== null) 
        {

            const gifs = data.map( (image : IGifs) => {
                const { downsized_medium } = image.images;

                return {
                    id: image.id,
                    title: image.title,
                    url: downsized_medium.url
                }
            });
            setImages( gifs )

        }

    }, [data, loading]);



    return (
        <>
            <h3 className='animate__animated animate__fadeIn' > { category } </h3>
            <div className='card-grid' >
                {
                    error !== null 
                    ? 
                        (<div> { error } </div>) 
                    : 
                        (
                            loading 
                            ? 
                            <div className='animate__animated animate__flash' > ...cargando </div> 
                            :
                            images.map(( img : IGifItem ) => {
                                return <GifGridItem key={ img.id }{ ...img } />                                    
                            })

                        )
                }                      
            </div>
        </>
    )
}

export default GifGrid
