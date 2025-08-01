import { StyleSheet, Pressable, FlatList, SafeAreaView } from 'react-native';
import { Link } from 'expo-router';
import { Text, View } from '@/components/Themed';

// Mock data - replace with TMDB API data later
const mockMovies = [
  { id: '550', title: 'Fight Club' },
  { id: '13', title: 'Forrest Gump' },
  { id: '680', title: 'Pulp Fiction' },
];

export default function HomeScreen() {

  const renderMovie = ({ item }: { item: typeof mockMovies[0] }) => (
    <Link href={`/${item.id}`} asChild>
      <Pressable style={styles.movieItem}>
        <Text style={styles.movieTitle}>{item.title}</Text>
      </Pressable>
    </Link>
  );

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.moviesListContainer}>
        <FlatList
          data={mockMovies}
          renderItem={renderMovie}
          keyExtractor={(item) => item.id}
          style={styles.movieList} />
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  moviesListContainer: {
    backgroundColor: 'red',
    flex: 1, 
    width: '100%',
  },

  movieList: {
    width: '100%',
    flex: 1,
  },

  movieItem: {
    backgroundColor: '#007AFF',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    width: '100%',
  },

  movieTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});