import { Text, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'expo-router';

 //    modified_at: v.string(),
 //    name: v.string(),
 //    neighborhood: v.string(),
 //    phone: v.string(),
 //    service_at: v.string(),
  
const Page = () => {
  const [name, setName] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [phone, setPhone] = useState('');
  const [service_at, setService_at] = useState('');
  const startPerson = useMutation(api.persons.create);
  const router = useRouter();

  // Create a new group with Convex mutation
  const onCreatePerson = async () => {
    await startPerson({
      name,
      neighborhood: neighborhood,
      phone: phone,
      service_at: service_at,
      modified_at: '',
    });
    router.back();
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={100}>
      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.textInput} value={name} onChangeText={setName} />
      <Text style={styles.label}>Celular</Text>
      <TextInput style={styles.textInput} value={phone} onChangeText={setPhone} />
      <Text style={styles.label}>Bairro</Text>
      <TextInput style={styles.textInput} value={neighborhood} onChangeText={setNeighborhood} />
      <Text style={styles.label}>Data do Culto</Text>
      <TextInput style={styles.textInput} value={service_at} onChangeText={setService_at} />
      <TouchableOpacity style={styles.button} onPress={onCreatePerson}>
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
