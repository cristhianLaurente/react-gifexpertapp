import React from 'react'
import PropTypes from 'prop-types';
import { IGifItem } from './GifGrid';



const GifGridItem : React.FC<IGifItem> = ( { id, title, url } ) => {

    return (
        <div className='card animate__animated animate__fadeIn' >
            <img src={url} alt={ title} />
            <p> { title } </p>
        </div>
    )

}

GifGridItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url : PropTypes.string.isRequired,
};

export default GifGridItem
