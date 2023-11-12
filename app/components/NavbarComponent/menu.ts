import {AntDesign} from "@expo/vector-icons";
import {TypeRootStackParamList} from "@app/navigation/types";

export interface INavbarItem {
    iconName: keyof typeof AntDesign.glyphMap;
    title: keyof TypeRootStackParamList
}

export const menu: INavbarItem[] = [
    {
        title: "Profile",
        iconName: "home"
    },
    {
        title: "Payments",
        iconName: "pay-circle1"
    },
    {
        title: "Services",
        iconName: "switcher"
    },
    {
        title: "Support",
        iconName: "message1"
    },
    {
        title: "More",
        iconName: "ellipsis1"
    }
]