import { StyleSheet, Text, TouchableOpacity, View, Dimensions, ActivityIndicator, ScrollView, StatusBar, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, SPACING } from '../theme/theme'
import { upcomingMovies, nowPlayingMovies, popularMovies, baseImagePath } from '../api/apicalls';
import InputHeader from '../components/InputHeader';
import CategoryHeader from '../components/CategoryHeader';
import SubMovieCard from '../components/SubMovieCard';
import MovieCard from '../components/MovieCard';

const { width, height } = Dimensions.get('window');
//api calls
const getNowPlayingMoviesList = async () => {
  try {
    let response = await fetch(nowPlayingMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error("Something went wrong in getNowPlayingMoviesList Func", error);
  }
}

const getUpcomingMoviesList = async () => {
  try {
    let response = await fetch(upcomingMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error("Something went wrong in getUpcomingMoviesList Func", error);
  }
}

const getPopularMoviesList = async () => {
  try {
    let response = await fetch(popularMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error("Something went wrong in getPopularMoviesList Func", error);
  }
}


const HomeScreen = ({ navigation }: any) => {

  const [nowPlayingMoviesList, setNowPlayingMoviesList] = useState<any>(undefined);
  const [popularMoviesList, setPopularMoviesList] = useState<any>(undefined);
  const [upcomingMoviesList, setUpcomingMoviesList] = useState<any>(undefined);

  useEffect(() => {
    (async () => {
      let tempNowPlaying = await getNowPlayingMoviesList();
      setNowPlayingMoviesList([
        {id: 'dummy1'},
        ...tempNowPlaying.results,
        {id: 'dummy2'},
      ]);
      // setNowPlayingMoviesList(tempNowPlaying.results);

      let tempUpcoming = await getUpcomingMoviesList();
      setUpcomingMoviesList(tempUpcoming.results);

      let tempPopular = await getPopularMoviesList();
      setPopularMoviesList(tempPopular.results);
    })();
  }, []);



  const searchMoviesFunction = () => {
    navigation.navigate('Search');
  }
  if (
    nowPlayingMoviesList == undefined
    && nowPlayingMoviesList == null
    && popularMoviesList == undefined
    && popularMoviesList == null
    && upcomingMoviesList == undefined
    && upcomingMoviesList == null) {
    return (
      <ScrollView style={styles.container} bounces={false} contentContainerStyle={styles.scrollViewContainer}>
        <StatusBar hidden />

        <View style={styles.inputHeaderContainer}>
          <InputHeader searchFunction={searchMoviesFunction} />
        </View>

        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.Orange} />
        </View>

      </ScrollView>
    )
  }
  return (
    <ScrollView style={styles.container} bounces={true} contentContainerStyle={styles.scrollViewContainer}>
      <StatusBar hidden />

      <View style={styles.inputHeaderContainer}>
        <InputHeader searchFunction={searchMoviesFunction} />
      </View>
      <CategoryHeader title={"Now Playing"} />
      
      <FlatList
        data={nowPlayingMoviesList}
        keyExtractor={(item: any) => item.id}
        bounces={false}
        snapToInterval={width * 0.7 + SPACING.space_36}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}) => {
          if (!item.original_title) {
            return (
              <View
                style={{
                  width: (width - (width * 0.7 + SPACING.space_36 * 2)) / 2,
                }}></View>
            );
          }
          return (
            <MovieCard
              shoudlMarginatedAtEnd={true}
              cardFunction={() => {
                navigation.push('MovieDetails', {movieid: item.id});
              }}
              cardWidth={width * 0.7}
              isFirst={index == 0 ? true : false}
              isLast={index == upcomingMoviesList?.length - 1 ? true : false}
              title={item.original_title}
              imagePath={baseImagePath('w780', item.poster_path)}
              genre={item.genre_ids.slice(1, 4)}
              vote_average={item.vote_average}
              vote_count={item.vote_count}
            />
          );
        }}
      />

      <CategoryHeader title={"Popular"} />
      <FlatList horizontal
        
        data={popularMoviesList}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={styles.containerGap36}
        renderItem={({ item, index }) => (
          <SubMovieCard 
          shoudlMarginatedAtEnd={true}
          cardFunction={() => {
            navigation.push('MovieDetails',{movieid: item.id});
          }}
          cardWidth= {width/3}
          isFirst = {index == 0 ? true : false}
          isLast = {index == upcomingMoviesList?.length -1 ? true : false}
          title={item.original_title} 
          imagePath={baseImagePath('w342',item.poster_path)}
          />
        )}
      />

      <CategoryHeader title={"Upcoming"} />

      <FlatList horizontal
        
        data={upcomingMoviesList}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={styles.containerGap36}
        renderItem={({ item, index }) => (
          <SubMovieCard 
          shoudlMarginatedAtEnd={true}
          cardFunction={() => {
            navigation.push('MovieDetails',{movieid: item.id});
          }}
          cardWidth= {width/3}
          isFirst = {index == 0 ? true : false}
          isLast = {index == upcomingMoviesList?.length -1 ? true : false}
          title={item.original_title} 
          imagePath={baseImagePath('w342',item.poster_path)}
          />
        )}
      />
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex : 1,
    backgroundColor: COLORS.Black
  },
  scrollViewContainer: {
    // flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  inputHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
  },
  containerGap36: {
    gap: SPACING.space_36,
  }

})