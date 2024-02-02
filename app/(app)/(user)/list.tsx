import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api';
import { Link } from 'expo-router';

const Page = () => {
  const users = useQuery(api.users.get) || [];
  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.container}>
        {users.map((user) => ( 
          <Link href={{ pathname: '/(user)/[userid]', params: { userid: user._id } }} key={user._id.toString()} asChild>
            <TouchableOpacity style={styles.user}>
              <View style={{ flex: 1 }}>
                <Text>{user.name}</Text>
                <Text style={{ color: '#888' }}>{user.phone}</Text>
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
  user: {
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
  }
})

export default Page;
