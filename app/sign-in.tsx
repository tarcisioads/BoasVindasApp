import { View, Text, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, BackHandler } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSession } from './ctx'
import { router } from 'expo-router'
import { isLoading } from 'expo-font';

const Page = () => {
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const navigation = useNavigation();
  const { signIn, isLoading, session } = useSession();


   // Safe the user name to async storage
  const setUser = async () => {
    let result = signIn(name);

    result = JSON.parse(result || '{}')

    if (!result || !result.name) {
        setMsg('Usuário não encontrado');
        return;
    }


    router.replace('/')

  };
  return (
    <View style={{flex: 1}}>
     <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={100}>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Boas Vindas</Text>
          <Text style={styles.subtitle}>Bola de Neve</Text>
          <Text style={styles.subtitle}>Vila Matilde</Text>
        </View>
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
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    marginTop: 35,
    marginVertical: 10,
    fontSize: 25,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
