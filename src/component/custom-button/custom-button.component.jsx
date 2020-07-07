import React from 'react'

//style
import {CustomButtonContainer} from './custom-button.style'

const CustomButton = ({children, ...otherProps}) => {
    return (
        <CustomButtonContainer {...otherProps} >
            {children}
        </CustomButtonContainer>
    )
}


export default CustomButton
