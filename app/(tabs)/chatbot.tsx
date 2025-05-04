import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import UUID from 'react-native-uuid';

// Define Message type
interface Message {
  id: string;
  text: string;
  sender: string;
  type: string;
}

export default function ChatbotScreen() {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);  // Set the type of messages

  const handleButtonClick = () => {
    if (!inputMessage.trim()) return;

    if (inputMessage.toLowerCase().includes('generate image')) {
      generateImages();
      setInputMessage('');
      return;
    }

    const userMessage: Message = { id: UUID.v4(), text: inputMessage, sender: 'user', type: 'text' };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({
        "messages": [
          { "role": "developer", "content": "You are a helpful assistant." },
          { "role": "user", "content": inputMessage }
        ],
        "model": "gpt-4o"
      })
    })
      .then(response => response.json())
      .then(data => {
        const assistantMessage = data.choices[0].message.content.trim();
        const assistantResponse: Message = { id: UUID.v4(), text: assistantMessage, sender: 'assistant', type: 'text' };
        setMessages(prevMessages => [...prevMessages, assistantResponse]);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    setInputMessage('');
  };

  const generateImages = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = { id: UUID.v4(), text: inputMessage, sender: 'user', type: 'text' };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({
        "prompt": inputMessage,
        "n": 3,
        "size": "512x512"
      })
    })
      .then(response => response.json())
      .then(data => {
        const imageUrls = data.data.map((item: { url: any; }) => ({
          id: UUID.v4(),
          text: item.url,
          sender: 'assistant',
          type: 'image'
        }));
        setMessages(prevMessages => [...prevMessages, ...imageUrls]);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    setInputMessage('');
  };

  const handleTextInput = (text: string) => {
    setInputMessage(text);
  };

  const renderItem = ({ item }: { item: Message }) => {
    return (
      <View style={[styles.messageContainer, item.sender === 'user' ? styles.userBubble : styles.assistantBubble]}>
        {item.type === 'text' ? (
          <Text style={styles.messageText}>{item.text}</Text>
        ) : (
          <ImageBackground source={{ uri: item.text }} style={styles.imageMessage} resizeMode="contain" />
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.messagesContainer}>
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your question"
          onChangeText={handleTextInput}
          value={inputMessage}
        />
        <TouchableOpacity onPress={handleButtonClick}>
          <View style={styles.sendButton}>
            <MaterialIcons name="send" size={30} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    justifyContent: 'space-between',
  },
  messagesContainer: {
    flex: 1,
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5, // for android
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: '#ddd', // light grey
    borderWidth: 1.5,
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 20,
    marginRight: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: '#333',
    fontFamily: 'Arial'
  },
  sendButton: {
    backgroundColor: 'red',
    borderRadius: 50,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 20,
    maxWidth: '80%',
  },
  userBubble: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
  },
  assistantBubble: {
    backgroundColor: '#eeebf5',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  imageMessage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
});



