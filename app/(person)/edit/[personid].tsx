import { Text, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { api } from '@/convex/_generated/api';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { Id } from '@/convex/_generated/dataModel';
import { useConvex, useMutation, useQuery } from 'convex/react';

const Page = () => {
  const { personid } = useLocalSearchParams();
  const [name, setName] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [phone, setPhone] = useState('');
  const [service_at, setService_at] = useState('');
 
  const editPerson = useMutation(api.persons.edit);
  const router = useRouter();
  const convex = useConvex();
  const navigation = useNavigation();

  // Load group name and set header title
  useEffect(() => {
    const loadPerson = async () => {
      const PersonInfo = await convex.query(api.persons.getPerson, { id: personid as Id<'persons'> });
      navigation.setOptions({ headerTitle: PersonInfo!.name });
      setName(PersonInfo!.name);
      setNeighborhood(PersonInfo!.neighborhood);
      setPhone(PersonInfo!.phone);
      setService_at(PersonInfo!.service_at);
    };
    loadPerson();
  }, [personid]);


  // Create a new group with Convex mutation
  const onEditPerson= async () => {
    await editPerson({
      id: personid as Id<'persons'>,
      name,
      neighborhood: neighborhood,
      phone: phone,
      service_at: service_at,
      modified_at: Date.now().toString(),
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

      <TouchableOpacity style={styles.button} onPress={onEditPerson}>
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
