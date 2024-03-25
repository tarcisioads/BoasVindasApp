import { Text, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { api } from '@/convex/_generated/api';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { Id } from '@/convex/_generated/dataModel';
import { useConvex, useMutation, useQuery } from 'convex/react';

const Page = () => {
  const { groupid } = useLocalSearchParams();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [address_number, setAddress_number] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [service_at, setService_at] = useState<string | undefined>('');
  const editGroup = useMutation(api.groups.edit);
  const router = useRouter();
  const convex = useConvex();
  const navigation = useNavigation();

  // Load group name and set header title
  useEffect(() => {
    const loadGroup = async () => {
      const GroupInfo = await convex.query(api.groups.getGroup, { id: groupid as Id<'groups'> });
      navigation.setOptions({ headerTitle: GroupInfo!.name });
      setName(GroupInfo!.name);
      setAddress(GroupInfo!.address);
      setAddress_number(GroupInfo!.address_number);
      setNeighborhood(GroupInfo!.neighborhood);
      setService_at(GroupInfo!.service_at);
    };
    loadGroup();
  }, [groupid]);


  // Create a new group with Convex mutation
  const onEditGroup= async () => {
    await editGroup({
      id: groupid as Id<'groups'>,
      name,
      address: address,
      address_number: address_number,
      neighborhood: neighborhood,
      service_at: service_at,
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
      <Text style={styles.label}>Dia / Horário</Text>
      <TextInput style={styles.textInput} value={service_at} onChangeText={setService_at} />


      <TouchableOpacity style={styles.button} onPress={onEditGroup}>
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
