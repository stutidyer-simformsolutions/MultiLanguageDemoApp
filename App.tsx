import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

import {I18n} from './app/translations';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {appConstant} from './app/constants';

function App(): React.JSX.Element {
const {t} = useTranslation();

const updateUserLanguage = async (language: string) => {
  I18n.changeLanguage(language);
  await AsyncStorage.setItem(appConstant.appLanguage, language);
};

  return (
    <View style={styles.container}>
      <Text style={styles.titleTxtStyle}>{t('home:title')}</Text>
      <Text style={styles.subTitleStyle}>{t('home:description')}</Text>
      <Button
        title={'English'}
        onPress={() => updateUserLanguage('en')}
      />
      <Button
        title={'French'}
        onPress={() => updateUserLanguage('fr')}
      />
    </View>
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
});

export default App;
