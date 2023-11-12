import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Login, More, Payments, Profile, Register, Services, Story, Support, Update} from "@app/screens";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {useAuth} from "@app/hooks/useAuth";
import {AntDesign} from "@expo/vector-icons";


interface IScreenOptions {
    headerShown: boolean,
    tabBarStyle: {
        paddingTop: number,
        paddingBottom: number,
        height: number
    }
}

const StackNavigation = createNativeStackNavigator();
const TabBottomNavigation = createBottomTabNavigator();
const DrawerNavigation = createDrawerNavigator();

const Drawer = () => {
    return (
        <DrawerNavigation.Navigator>
            <DrawerNavigation.Screen name="More" component={More}/>
        </DrawerNavigation.Navigator>
    )
}

const ProfileScreen = () => {
    return (
        <StackNavigation.Navigator>
            <StackNavigation.Screen
                name="Main"
                component={Profile}
                options={{headerShown: false}}
            />
            <StackNavigation.Screen name="Update" component={Update}/>
        </StackNavigation.Navigator>
    )
}


const Tab = () => {
    const screenOptions: IScreenOptions = {
        headerShown: false,
        tabBarStyle: {
            paddingTop: 10,
            paddingBottom: 10,
            height: 70
        },
    };

    return (
        <TabBottomNavigation.Navigator screenOptions={screenOptions}>
            <TabBottomNavigation.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <AntDesign name="home" color={color} size={size}/>
                    )
                }}
            />
            <TabBottomNavigation.Screen
                name="Payments"
                component={Payments}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <AntDesign name="pay-circle1" color={color} size={size}/>
                    ),
                }}
            />
            <TabBottomNavigation.Screen
                name="Services"
                component={Services}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <AntDesign name="switcher" color={color} size={size}/>
                    ),
                }}
            />
            <TabBottomNavigation.Screen
                name="Support"
                component={Support}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <AntDesign name="message1" color={color} size={size}/>
                    ),
                }}
            />
            <TabBottomNavigation.Screen
                name="Drawer"
                component={Drawer}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <AntDesign name="ellipsis1" color={color} size={size}/>
                    ),
                }}
            />
        </TabBottomNavigation.Navigator>
    )
}

const Navigation = () => {
    const {user, logout, data} = useAuth();

    return (
        <NavigationContainer>
            <StackNavigation.Navigator screenOptions={{headerShown: false}}>
                {
                    !data
                        ? (
                            <StackNavigation.Group screenOptions={{headerShown: false}}>
                                <StackNavigation.Screen name="Login" component={Login}/>
                                <StackNavigation.Screen name="Register" component={Register}/>
                            </StackNavigation.Group>
                        )
                        : (
                            <StackNavigation.Group screenOptions={{headerShown: false}}>
                                <StackNavigation.Screen name="Tab" component={Tab}/>
                                <StackNavigation.Screen name="Story" component={Story}/>
                            </StackNavigation.Group>
                        )
                }
            </StackNavigation.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;