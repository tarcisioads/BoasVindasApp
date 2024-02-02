import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSession } from '../ctx'

const UserProfileScreen = () => {
  const [user, setUser] = useState({ name: "" }); // Assuming initial logged-in state
  const navigation = useNavigation();
  const { signOut, session } = useSession();

  const handleLogout = async () => {
    signOut();
  };

  const handleUsers = async () => {
    navigation.navigate('/(user)/list');
  };

  const handleGroups = async () => {
    navigation.navigate('/(group)/list'); 
  }


  return (
    <View style={{ flex:1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.userProfileContainer}>
          <Ionicons name="person-circle-outline" size={150} color="#000" />
          <Text style={styles.user}>{user!.name}</Text>
          <TouchableOpacity style={styles.button} onPress={handleLogout} >
            <Ionicons name="log-out-outline" size={32} color="#000" />
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.menu}>
          

          <TouchableOpacity style={styles.button} onPress={handleUsers} >
            <Ionicons name="people-circle-outline" size={32} color="#000" />
            <Text>Usuários</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleGroups} >
            <Ionicons name="home" size={32} color="#000" />
            <Text>Celulas</Text>
          </TouchableOpacity>
 
        </View>
      </ScrollView>  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F8F5EA',
  },
  userProfileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  user: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  menu: {
    flexDirection: 'column', 
    justifyContent: 'space-around', 
    padding: 10,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F8F5EA',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
    marginBottom: 20,
  }

})


export default UserProfileScreen;
