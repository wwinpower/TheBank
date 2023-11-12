// NavbarComponent.tsx
import React, {FC} from 'react';
import {NavContainer} from './styles';
import {menu} from '@components/NavbarComponent/menu';
import NavLink from './components/NavLink';
import {TypeRootStackParamList} from '@navigation/types';
import {useNavigation, useRoute} from "@react-navigation/native";

interface INavbarComponent {
    navigate: (screenName: keyof TypeRootStackParamList) => void;
    currentRoute: string;
}

const NavbarComponent: FC = ({}) => {
    const {navigate} = useNavigation();
    const currentRoute = useRoute();

    return (
        <NavContainer>
            {menu &&
                menu.map((item, index) => (
                    <NavLink
                        key={item.title + item.iconName}
                        item={item}
                        navigate={navigate}
                        currentRoute={currentRoute.name}
                    />
                ))}
        </NavContainer>
    );
};

export default NavbarComponent;
