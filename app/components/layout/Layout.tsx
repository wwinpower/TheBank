import React, {FC, ReactNode} from 'react';
import {ScrollView, View} from "react-native";

interface ILayout {
    isScrollView?: boolean;
    children: ReactNode;
}

const Layout: FC<ILayout> = ({children, isScrollView = true}) => {
    return (
        <View>

        </View>
    );
};

export default Layout;