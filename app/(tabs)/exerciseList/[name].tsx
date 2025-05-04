import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';  // For dynamic route params and back navigation
import exercises from '../../../assets/data/exercises.json';  // Correct path to data
import { IconSymbol } from '@/components/ui/IconSymbol';  // Assuming you have this component for icons
import { useState } from 'react';

export default function ExerciseDetailsScreen() {
  const params = useLocalSearchParams();  // Get the dynamic 'name' parameter
  const [isInstructionExpanded, setIsInstructionExpanded] = useState(false);
  const router = useRouter();  // Router to handle back navigation

  // Find the exercise by name from the data
  const exercise = exercises.find((item) => item.name === params.name);

  if (!exercise) {
    return <Text>Exercise not found</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.panel}>
        <TouchableOpacity onPress={() => router.push('/exercise')} style={styles.backButton}>
          <IconSymbol
            size={28}
            name="arrow.left"  // Left arrow icon
            color="#333"  // Change the color as per your design
          />
        </TouchableOpacity>

        <Text style={styles.exerciseName}>{exercise.name}</Text>

        <Text style={styles.exerciseSubtitle}>
          <Text style={styles.subValue}>Muscle: {exercise.muscle}</Text> |{' '}
          <Text style={styles.subValue}>Equipment: {exercise.equipment}</Text>
        </Text>
      </View>

      
      {exercise.gif && (
        <View style={styles.panel}>
          <Image source={{ uri: exercise.gif }} style={styles.exerciseGif} />
        </View>
      )}

      <View style={styles.panel}>
        <Text style={styles.instructions} numberOfLines={isInstructionExpanded ? 0 : 3}>
          {exercise.instructions}
        </Text>
        <Text 
          onPress={() => setIsInstructionExpanded(!isInstructionExpanded)}
          style={styles.seeMore}
        >
          {isInstructionExpanded ? 'See less' : 'See more'}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 20,
    backgroundColor: '#f9f9f9',
    gap: 10,
  },
  panel: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,  // Add margin for spacing
  },
  exerciseName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  exerciseSubtitle: {
    fontSize: 18,
    color: 'gray',
    marginVertical: 5,
  },
  subValue: {
    fontWeight: 'bold',
  },
  backButton: {
    paddingVertical: 10,
    paddingLeft: 5,
    marginBottom: 10,
  },
  instructions: {
    fontSize: 16,
    lineHeight: 22,
  },
  seeMore: {
    alignSelf: 'center',
    padding: 5,
    fontWeight: '600',
    color: 'gray',
  },
  exerciseGif: {
    width: '100%',
    height: 250,  // You can adjust the height based on your design preferences
    borderRadius: 8,
  },
});


