import React, {FC, useEffect, useRef, useState} from 'react';
import {BackHandler, Dimensions, Image, StatusBar, View, FlatList, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

const {height, width} = Dimensions.get('window');

const Story: FC = () => {
    const navigation = useNavigation();
    const {params} = useRoute();
    const data: string[] = (params as { data?: string[] })?.data || [];

    const [storiesData, setStoriesData] = useState<string[]>(data || []);
    const [activeIndex, setActiveIndex] = useState(0);
    const listRef = useRef<FlatList>(null);

    useEffect(() => {
        const backAction = () => {
            navigation.goBack();
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, [navigation]);

    useEffect(() => {
        const timer = setInterval(() => {
            if (activeIndex < storiesData.length - 1) {
                listRef.current?.scrollToIndex({index: activeIndex + 1, animated: true});
                setActiveIndex((prevIndex) => prevIndex + 1);
            } else {
                clearInterval(timer);
                navigation.goBack();
            }
        }, 5000);

        return () => clearInterval(timer);
    }, [activeIndex, navigation, storiesData]);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={'black'} barStyle="light-content"/>
            <FlatList
                ref={listRef}
                data={storiesData}
                horizontal
                pagingEnabled
                renderItem={({item}) => (
                    <Image source={{uri: item}} style={styles.image}/>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 1000, // Вы можете настроить значение zIndex по вашему усмотрению
    },
    image: {
        width,
        height:"100%",
        resizeMode: 'cover',
    },
});

export default Story;
