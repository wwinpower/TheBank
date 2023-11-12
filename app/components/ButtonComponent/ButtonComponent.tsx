import React from 'react';
import {StyledButton, ButtonText} from "./styles"

interface ButtonProps {
    onPress?: () => void;
    children: React.ReactNode;
}

const ButtonComponent: React.FC<ButtonProps> = ({onPress, children}) => {
    return (
        <StyledButton onPress={onPress}>
            <ButtonText>{children}</ButtonText>
        </StyledButton>
    );
};

export default ButtonComponent;
