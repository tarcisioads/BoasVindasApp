import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api';
import { Link } from 'expo-router';

const Page = () => {
  const persons = useQuery(api.persons.get) || [];
  const groups = useQuery(api.groups.get) || [];
  const data = persons.map(person => ({
      ...person,
      group: groups.filter(group => (group._id === person.group_id))
    }))
  console.log(groups)
 

 
  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.container}>
      {data.map((person) => ( 
        <Link href={{ pathname: '/(person)/[personid]', params: { personid: person._id } }} key={person._id.toString()} asChild>
          <TouchableOpacity style={styles.person}>
            <View style={{ flex: 1 }}>
              <Text>{person.name}</Text>
              <Text style={{ color: '#888' }}>{person.phone}</Text>
                <Text style={{ color: '#888' }}>{person.neighborhood}</Text>
                <Text style={{ color: '#888' }}>{person.group_id}</Text>
                <Text style={{ color: '#888' }}>{person.group.name}</Text>
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
