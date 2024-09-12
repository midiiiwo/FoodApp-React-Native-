import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import messaging from '@react-native-firebase/messaging';



const _layout = () => {
    /**async function requestUserPermission() {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      
        if (enabled) {
          console.log('Authorization status:', authStatus);
        }
      }
      
      const getToken = async () => {
        try {
          const token = await messaging().getToken();
          console.log("Token =", token);
          return token;
        } catch (error) {
          console.error("Error getting token:", error);
        }
      };

useEffect(()=>{
    requestUserPermission()
    getToken()
},[])*/
    return (
        <Stack>
            <Stack.Screen 
                name="index" 
                options={{ headerShown: false }} 
            />
            <Stack.Screen 
                name="resturantScreen" 
                options={{ headerShown: false, title: 'Restaurant' }} 
            />
            <Stack.Screen 
                name="CartScreen" 
                options={{ headerShown: false, title: 'CartScreen', presentation: 'modal' }} 
            />
        </Stack>
    );
};

export default _layout;
