import { View, Text, ScrollView, StyleSheet, TouchableOpacity, PanResponder } from 'react-native';
import React, { useEffect } from 'react';
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api';
import { Link } from 'expo-router';

const Page = () => {
  const groups = useQuery(api.groups.get) || [];
  const persons = useQuery(api.persons.get) || [];
  const data = persons.map(person => (
    {
      ...person,
      group: groups.find(group => (group._id+'' === person.group_id+''))
    }))

    return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.container}>
      {data.map((person) => ( 
        <Link href={{ pathname: '/(person)/[personid]', params: { personid: person._id } }} key={person._id.toString()} asChild>
          <TouchableOpacity style={styles.person}>
            <View style={{ flex: 1 }}>
              <Text>{person.name}</Text>
              <Text style={{ color: '#888' }}>{person.phone}</Text>
              <View style={{ flexDirection: 'row', gap: 5 }}>
                <Text style={{flex: 1, color: '#888' }}>{person.neighborhood}</Text>
                <Text style={person.group?styles.celula:null}>{person.group?'Célula '+person.group!.name:null}</Text>
              </View>
              <View style={{ flexDirection: 'row', gap: 5 }}>
                <Text style={styles.timestamp}>
                  {new Date(item._creationTime).toLocaleDateString()} {new Date(item._creationTime).toLocaleTimeString()} - {item.user}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', gap: 5 }}>
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
  celula: {
    color: '#fff', 
    textAlign: 'right', 
    backgroundColor: '#EEA217',
    borderRadius: 5,
    padding: 2, 
  },
  timestamp: {
    fontSize: 12,
    color: '#c7c7c7',
  },
 
})


export default Page;
