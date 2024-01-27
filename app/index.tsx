import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useQuery } from 'convex/react'
import { api } from '../convex/_generated/api';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const Page = () => {
  const navigation = useNavigation();
  const persons = useQuery(api.persons.get) || [];

  // Check if the user has a name, otherwise show modal
  useEffect(() => {
    const loadUser = async () => {
      const user = await AsyncStorage.getItem('user');
      if (!user) {
        navigation.navigate('login'); 
      }
    };
    loadUser();
  }, []);


  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.container}>
      {persons.map((person) => ( 
        <Link href={{ pathname: '/(person)/[personid]', params: { personid: person._id } }} key={person._id.toString()} asChild>
          <TouchableOpacity style={styles.person}>
            <View style={{ flex: 1 }}>
              <Text>{person.name}</Text>
              <Text style={{ color: '#888' }}>{person.phone}</Text>
              <Text style={{ color: '#888' }}>{person.neighborhood}</Text>
            </View>
          </TouchableOpacity>
        </Link>
      ))
      }
    </ScrollView>
  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F8F5EA'
  },
  person: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },

})


export default Page;
