import {StatusBar} from 'expo-status-bar';
import 'react-native-gesture-handler';
import {LogBox, StyleSheet, Text, View} from 'react-native';
import {AuthProvider} from "@providers/AuthProvider";
import Navigation from "./app/navigation/Navigation";
import {Inter_900Black, useFonts} from "@expo-google-fonts/inter";


export default function App() {
    let [fontsLoaded, fontError] = useFonts({
        Inter_900Black,
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return <AuthProvider><Navigation/></AuthProvider>
}

LogBox.ignoreAllLogs();