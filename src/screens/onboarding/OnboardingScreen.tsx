import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { width } = Dimensions.get('window');

type RootStackParamList = {
  Onboarding: undefined;
  Auth: undefined;
  Home: undefined;
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Onboarding'
>;

const slides = [
  {
    id: '1',
    title: "Let's create  a Space For Your Workflows",
    image: require('../../assets/images/workflow.jpg'),
  },
  {
    id: '2',
    title: 'Task Calendar Scheduling',
    image: require('../../assets/images/task.jpg'),
  },
  {
    id: '3',
    title: 'Work with Team Anytime',
    image: require('../../assets/images/team.jpg'),
  },
];

const OnboardingScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />

      {/* Dots */}
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>

      {/* Button only on last slide */}
      {currentIndex === slides.length - 1 ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace('Auth')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {},
  slide: {
    width,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 400,
    objectFit: 'contain',
  },
  title: {
    fontSize: 58,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 50,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: { backgroundColor: '#007AFF', width: 12 },
  button: {
    backgroundColor: '#007AFF',
    marginHorizontal: 50,
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 40,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
