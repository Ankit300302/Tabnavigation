import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

const API_URL = 'https://dummy.restapiexample.com/api/v1';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="GET" component={GetDataScreen} />
        <Tab.Screen name="POST" component={PostDataScreen} />
        <Tab.Screen name="PUT" component={PutDataScreen} />
        <Tab.Screen name="DELETE" component={DeleteDataScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const GetDataScreen = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/employees`);
        const json = await response.json();
        setData(json.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GET Method</Text>
      {data && (
        <View>
          <Text style={styles.subtitle}>Fetched Data:</Text>
          {data.map((item) => (
            <Text key={item.id} style={styles.item}>
              {item.employee_name} - {item.employee_age}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

const PostDataScreen = () => {
  const createData = async () => {
    try {
      const response = await fetch(`${API_URL}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'John Doe',
          age: 30,
          salary: 5000,
        }),
      });
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>POST Method</Text>
      <Button title="Create Data" onPress={createData} />
    </View>
  );
};

const PutDataScreen = () => {
  const updateData = async () => {
    try {
      const response = await fetch(`${API_URL}/update/1`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Updated Name',
          age: 35,
          salary: 6000,
        }),
      });
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PUT Method</Text>
      <Button title="Update Data" onPress={updateData} />
    </View>
  );
};

const DeleteDataScreen = () => {
  const deleteData = async () => {
    try {
      const response = await fetch(`${API_URL}/delete/1`, {
        method: 'DELETE',
      });
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DELETE Method</Text>
      <Button title="Delete Data" onPress={deleteData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  item: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default App;
