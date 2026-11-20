
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  ScrollView
} from 'react-native';

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleContinue = () => {
    if (!email || !password || (!isLogin && !name)) {
      Alert.alert('Missing information', 'Please complete all required fields.');
      return;
    }

    Alert.alert(
      'Connectly',
      'Your screen is ready! Supabase authentication will be connected next.'
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#10102B" />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>C</Text>
        </View>

        <Text style={styles.brand}>Connectly</Text>
        <Text style={styles.tagline}>
          Connect. Chat. Share.
        </Text>

        <View style={styles.card}>
          <Text style={styles.heading}>
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </Text>

          <Text style={styles.subtitle}>
            {isLogin
              ? 'Sign in to continue your conversations.'
              : 'Join Connectly and stay connected.'}
          </Text>

          {!isLogin && (
            <TextInput
              style={styles.input}
              placeholder="Your full name"
              placeholderTextColor="#9292A8"
              value={name}
              onChangeText={setName}
            />
          )}

          <TextInput
            style={styles.input}
            placeholder="Email address"
            placeholderTextColor="#9292A8"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#9292A8"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleContinue}
          >
            <Text style={styles.buttonText}>
              {isLogin ? 'Sign In' : 'Create Account'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setIsLogin(!isLogin)}
          >
            <Text style={styles.switchText}>
              {isLogin
                ? "Don't have an account? Sign Up"
                : 'Already have an account? Sign In'}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>
          Connectly • Your world, connected.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#10102B'
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24
  },
  logo: {
    width: 76,
    height: 76,
    borderRadius: 24,
    backgroundColor: '#8055F5',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: 'bold'
  },
  brand: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 14
  },
  tagline: {
    color: '#B7A8F8',
    textAlign: 'center',
    fontSize: 15,
    marginTop: 6,
    marginBottom: 32
  },
  card: {
    backgroundColor: '#1D1D3B',
    padding: 24,
    borderRadius: 22
  },
  heading: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 8
  },
  subtitle: {
    color: '#B6B6CA',
    fontSize: 14,
    marginBottom: 24
  },
  input: {
    backgroundColor: '#292947',
    color: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 15
  },
  button: {
    backgroundColor: '#8055F5',
    padding: 17,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
  switchText: {
    color: '#BBA7FF',
    textAlign: 'center',
    marginTop: 22,
    fontSize: 14
  },
  footer: {
    color: '#777792',
    textAlign: 'center',
    marginTop: 30,
    fontSize: 12
  }
});

