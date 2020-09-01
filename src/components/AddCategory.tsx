import React, { useState } from 'react'
import PropTypes from 'prop-types';


type TEventInput = React.ChangeEvent< HTMLInputElement >
type TFormEvent = React.FormEvent< HTMLFormElement >


interface IProps {
    setCategories : React.Dispatch< React.SetStateAction<string[]> >
}


const AddCategory : React.FC<IProps> = ({ setCategories }) => {

    const [inputValue, setInputValue] = useState<string>('');
    
    const handleUpdate = (e : TEventInput ) => setInputValue(e.target.value)


    const handleSubmit = (e : TFormEvent ) => { 

        e.preventDefault(); 

        if ( inputValue.trim().length > 2 ) {

            setCategories( cats => [ inputValue, ...cats ] ) 
            setInputValue( '' )

        } 

    }

    return (
        <form onSubmit={ handleSubmit  } >        
            <input 
                type="text"
                value={ inputValue }
                onChange={ handleUpdate }
            />
        </form>
    )
};

AddCategory.propTypes = {

    setCategories: PropTypes.func.isRequired    

}

export default AddCategory
