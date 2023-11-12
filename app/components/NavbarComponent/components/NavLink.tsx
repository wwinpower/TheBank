import React, {FC, useEffect, useState} from 'react';
import {AntDesign} from '@expo/vector-icons';
import {NavItem, NavItemLink} from '../styles';
import {TouchableOpacity} from 'react-native';
import {INavbarItem} from '@components/NavbarComponent/menu';
import {TypeRootStackParamList} from '@navigation/types';

interface INavLink {
    item: INavbarItem;
    navigate: (screenName: keyof TypeRootStackParamList) => void;
    currentRoute: string;
}

const NavLink: FC<INavLink> = ({item, navigate, currentRoute}) => {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        item.title === currentRoute ? setIsActive(true) : setIsActive(false);
    }, [item, currentRoute]);

    return (
        <TouchableOpacity onPress={() => navigate(item.title)}>
            <NavItem isActive={isActive}>
                <AntDesign name={item.iconName} style={{textAlign: 'center', fontSize: 16}}/>
                <NavItemLink>{item.title}</NavItemLink>
            </NavItem>
        </TouchableOpacity>
    );
};

export default NavLink;
