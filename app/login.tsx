import { View, Text, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, BackHandler } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from 'convex/react'
import { api } from '../convex/_generated/api';

const Page = () => {
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const navigation = useNavigation();
  const users = useQuery(api.users.get) || [];

  useEffect(() => {
    const loadUser = async () => {
      setMsg('')
      const user = await AsyncStorage.getItem('user');
      if (user) {
        setName(user.name);
        navigation.navigate('index');
      }

    };
    loadUser();
  }, []);
  
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // Handle back button press (e.g., display a confirmation dialog)
      return true; // Prevent default back action
    });
    return () => backHandler.remove();
  }, []);

  // Safe the user name to async storage
  const setUser = async () => {
    const user = users.find((u) => u.name.toLowerCase() === name.toLowerCase()); 
    if (user) {
      delete user.password;
    } else {
      setMsg('Usuário não encontrado');
      return;
    }
    const userName = `${user.name}`;
    const json = JSON.stringify(user);
    await AsyncStorage.setItem('user', json);
    setName(userName);
    navigation.navigate('index');
  };
  return (
    <View style={{flex: 1}}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={100}>
        <Text style={styles.label}>Nome</Text>
        <TextInput style={styles.textInput} value={name} onChangeText={setName} />
        <TouchableOpacity style={styles.button} onPress={setUser}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.labelmsg} >{msg}</Text>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F8F5EA'
  },
  label: {
    marginVertical: 10,
  },
  labelmsg: {
    marginVertical: 10,
    color: 'red'
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    minHeight: 40,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#EEA217',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default Page;
