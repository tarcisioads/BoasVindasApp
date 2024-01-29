import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const UserProfileScreen = () => {
  const [user, setUser] = useState({name:""}); // Assuming initial logged-in state
  const navigation = useNavigation();

  // Check if the user has a name, otherwise show modal
  useEffect(() => {
    const loadUser = async () => {
      const user = await AsyncStorage.getItem('user');
      if (!user) {
        navigation.navigate('login'); 
      } else {
        setUser(JSON.parse(user!));
      }
    };
    loadUser();
  }, []);


  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    navigation.navigate('login'); 
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <>
        <Ionicons name="person-circle-outline" size={150} color="#000" />
        <Text style={{ fontSize: 24, marginTop: 15, marginBottom: 15 }}>{user!.name}</Text>
        <Button title="Logout" onPress={handleLogout} />
        <Button title="Logout" onPress={handleLogout} />
      </>
    </View>
  );
};

export default UserProfileScreen;
