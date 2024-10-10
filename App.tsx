import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { appConstant } from './app/constants';
import { I18n } from './app/translations';

const Stack = createStackNavigator();

const HomeScreen = ({navigation}) => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.titleTxtStyle}>{t('home:title')}</Text>
      <Text style={styles.subTitleStyle}>{t('home:description')}</Text>
      <Button
        title={t('home:btnText')}
        onPress={() => navigation.navigate('Detail')}
      />
    </View>
  );
};

const DetailScreen = ({navigation}) => {
  const {t} = useTranslation();

  const updateUserLanguage = async (language: string) => {
    I18n.changeLanguage(language);
    await AsyncStorage.setItem(appConstant.appLanguage, language);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleTxtStyle}>{t('detail:screenName')}</Text>
      <Text style={styles.subTitleStyle}>{t('detail:description')}</Text>
      <View style={styles.btnContainerStyle}>
        <Button title={'English'} onPress={() => updateUserLanguage('en')} />
        <Button title={'French'} onPress={() => updateUserLanguage('fr')} />
      </View>
      <Button
        title={t('detail:btnText')}
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  titleTxtStyle: {fontSize: 24, fontWeight: 'bold'},
  subTitleStyle: {
    fontSize: 18,
    paddingHorizontal: 20,
    textAlign: 'center',
    paddingVertical: 10,
  },
  btnContainerStyle: {flexDirection: 'row', justifyContent: 'space-around'},
});

export default App;
