import React from 'react'
//style
import {GroupContainer, FormInputContainer, FormInputLabel} from './form-input.style'

const FormInput = ({handleChange, label, ...otherProps}) => {
    return (
        <GroupContainer>
            <FormInputContainer onChange={handleChange} {...otherProps} />
            {label ?
                 (<FormInputLabel className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>
                     {label}
                 </FormInputLabel>) : null }
        </GroupContainer>
    )
}

export default FormInput
