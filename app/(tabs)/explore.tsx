import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ExternalLink } from '@/components/ExternalLink';

const TabTwoScreen = () => {
  // Open a URL (e.g., email or LinkedIn) when the developer's name is clicked
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* App Information */}
        <View style={styles.section}>
          <ThemedText type="title" style={styles.sectionTitle}>
            App Information
          </ThemedText>
          <ThemedText style={styles.text}>
            This app provides a user-friendly way to explore features of React Native and Expo. It showcases a variety of components, animations, and navigation techniques.
          </ThemedText>
          <ThemedText style={styles.text}>
            <ThemedText type="defaultSemiBold">Version:</ThemedText> 1.0.0
          </ThemedText>
          <ThemedText style={styles.text}>
            <ThemedText type="defaultSemiBold">Features:</ThemedText> React Navigation, Animations, Dynamic Data, and more.
          </ThemedText>
        </View>

        {/* Developer Details */}
        <View style={styles.section}>
          <ThemedText type="title" style={styles.sectionTitle}>
            Developer Details
          </ThemedText>
          <ThemedText style={styles.text}>
            This app was developed by{' '}
            <TouchableOpacity onPress={() => openLink('https://www.linkedin.com/in/developer-name')}>
              <ThemedText type="link">Curtis Mensah</ThemedText>
            </TouchableOpacity>
            , a React Native Developer passionate about creating cross-platform mobile applications.
          </ThemedText>
          <ThemedText style={styles.text}>
            <ThemedText type="defaultSemiBold">Email:</ThemedText> curtismensah48@gmail.com
          </ThemedText>
          <ThemedText style={styles.text}>
            <ThemedText type="defaultSemiBold">LinkedIn:</ThemedText>{' '}
            <ExternalLink href="https://www.linkedin.com/in/curmens">
              <ThemedText type="link">Visit LinkedIn Profile</ThemedText>
            </ExternalLink>
          </ThemedText>
        </View>

        {/* Credits */}
        <View style={styles.section}>
          <ThemedText type="title" style={styles.sectionTitle}>
            Credits
          </ThemedText>
          <ThemedText style={styles.text}>
            This app was created using the following open-source libraries:
          </ThemedText>
          <ThemedText style={styles.text}>
            <ThemedText type="defaultSemiBold">React Native:</ThemedText> Open-source framework for building mobile apps.
          </ThemedText>
          <ThemedText style={styles.text}>
            <ThemedText type="defaultSemiBold">Expo:</ThemedText> Open-source platform for universal React apps.
          </ThemedText>
          <ThemedText style={styles.text}>
            <ThemedText type="defaultSemiBold">React Navigation:</ThemedText> Library for navigation in React Native apps.
          </ThemedText>
          <ExternalLink href="https://reactnative.dev/">
            <ThemedText type="link">React Native Documentation</ThemedText>
          </ExternalLink>
          <ExternalLink href="https://docs.expo.dev/">
            <ThemedText type="link">Expo Documentation</ThemedText>
          </ExternalLink>
        </View>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    // padding left right
    paddingHorizontal: 24,
    // padding top bottom
    paddingVertical: 64,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 8,
  },
});

export default TabTwoScreen;
