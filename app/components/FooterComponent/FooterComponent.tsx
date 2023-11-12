import React, {FC, ReactNode} from 'react';
import {FooterContainer} from "./styles";

interface IFooterComponentProps {
    children: ReactNode
}

const FooterComponent: FC<IFooterComponentProps> = ({children}) => {
    return (
        <FooterContainer>
            {children}
        </FooterContainer>
    );
};

export default FooterComponent;