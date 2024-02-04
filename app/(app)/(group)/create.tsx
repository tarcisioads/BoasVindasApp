import { Text, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'expo-router';

 //    address: v.string(),
 //    address_number: v.string(),
 //    neighborhood: v.string(),
 
const Page = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [address_number, setAddress_number] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const startGroup = useMutation(api.groups.create);
  const router = useRouter();

  // Create a new group with Convex mutation
  const onCreateGroup = async () => {
    await startGroup({
      name,
      address: address,
      address_number: address_number,
      neighborhood: neighborhood,
    });
    router.back();
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={100}>
      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.textInput} value={name} onChangeText={setName} />
      <Text style={styles.label}>Endereço</Text>
      <TextInput style={styles.textInput} value={address} onChangeText={setAddress} />
      <Text style={styles.label}>Nr. Endereço</Text>
      <TextInput style={styles.textInput} value={address_number} onChangeText={setAddress_number} />
      <Text style={styles.label}>Bairro</Text>
      <TextInput style={styles.textInput} value={neighborhood} onChangeText={setNeighborhood} />


      <TouchableOpacity style={styles.button} onPress={onCreateGroup}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F5EA',
    padding: 10,
  },
  label: {
    marginVertical: 10,
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
});

export default Page;
