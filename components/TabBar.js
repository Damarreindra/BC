import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

const TabBar = ({ state, descriptors, navigation }) => {
    const icons = {
        // index: (props) => <AntDesign name='home' size={26} color={'#222'} {...props} />,
        home: (props) => <AntDesign name='home' size={26} color={'#222'} {...props} />,
        // login: (props) => <AntDesign name='login' size={26} color={'#222'} {...props} />,
        leaderboard: (props) => <MaterialCommunityIcons name='podium' size={26} color={'#222'} {...props} />,
    };

    return (
        <View style={styles.tabBar}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                if (['_sitemap', '+not-found', 'index', 'login'].includes(route.name)) return null;
                
                const isFocused = state.index === index;
                
                // Animation for scaling the icon
                const scaleValue = useRef(new Animated.Value(1)).current;

                useEffect(() => {
                    Animated.timing(scaleValue, {
                        toValue: isFocused ? 1 : 0.8, // 1.3 is the focused size, 1 is the default
                        duration: 300, // duration of transition
                        useNativeDriver: true,
                    }).start();
                }, [isFocused]);

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={route.name}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tabBarItem}
                    >
                        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                            {icons[route.name]({
                                color: isFocused ? '#FF5733' : '#222',
                            })}
                        </Animated.View>
                        <Text style={{ color: isFocused ? '#FF5733' : '#222', fontSize: 11 }}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        bottom: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        marginHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 25,
        borderCurve: 'continuous',
        borderColor: 'black',
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        shadowOpacity: 0.1,
        elevation: 10,
    },
    tabBarItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default TabBar;
