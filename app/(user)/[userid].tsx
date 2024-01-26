import { Text, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { api } from '@/convex/_generated/api';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { Id } from '@/convex/_generated/dataModel';
import { useConvex, useMutation, useQuery } from 'convex/react';

const Page = () => {
  const { userid } = useLocalSearchParams();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const editUser = useMutation(api.users.edit);
  const router = useRouter();
  const convex = useConvex();
  const navigation = useNavigation();

  // Load group name and set header title
  useEffect(() => {
    const loadUser = async () => {
      const UserInfo = await convex.query(api.users.getUser, { id: userid as Id<'users'> });
      console.log(UserInfo);
      navigation.setOptions({ headerTitle: UserInfo!.name });
    };
    loadUser();
  }, [userid]);


  // Create a new group with Convex mutation
  const onEditUser= async () => {
    await editUser({
      id: userid as Id<'users'>,
      name,
      password: password,
      phone: phone,
    });
    router.back();
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={100}>
      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.textInput} value={name} onChangeText={setName} />
      <Text style={styles.label}>Celular</Text>
      <TextInput style={styles.textInput} value={phone} onChangeText={setPhone} />
      <Text style={styles.label}>Senha</Text>
      <TextInput style={styles.textInput} value={password} onChangeText={setPassword} secureTextEntry={true} />
      <TouchableOpacity style={styles.button} onPress={onEditUser}>
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
