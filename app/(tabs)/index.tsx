import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  // Navigate to the Chatbot screen when the button is pressed
  const goToChatbot = () => {
    router.push('/chatbot');  // Assuming your chatbot screen is in the /chatbot route
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to the ChatBot App!</Text>
      <Text style={styles.infoText}>This is the Home page. You can navigate to the Chatbot tab to start chatting.</Text>
      <Button title="Go to Chatbot" onPress={goToChatbot} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});
