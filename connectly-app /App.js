
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';

import { supabase } from './supabase';

export default function App() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((_event, newSession) => {
        setSession(newSession);
      });

    return () => subscription.unsubscribe();
  }, []);

  async function handleAuth() {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      Alert.alert('Missing details', 'Please enter your email and password.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Password too short', 'Use at least 6 characters.');
      return;
    }

    setLoading(true);

    try {
      if (isSignup) {
        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
        });

        if (error) throw error;

        if (data.session) {
          Alert.alert('Welcome to Connectly!', 'Your account is ready.');
        } else {
          Alert.alert(
            'Check your email',
            'Your account has been created. Please confirm your email before logging in.'
          );
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

        if (error) throw error;
      }
    } catch (error) {
      Alert.alert('Authentication error', error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert('Error', error.message);
    }
  }

  if (session) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.logo}>Connectly</Text>
        <Text style={styles.heading}>You're connected!</Text>
        <Text style={styles.subtitle}>{session.user.email}</Text>
        <Text style={styles.welcome}>
          Welcome to your Connectly account.
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.logo}>Connectly.</Text>
        <Text style={styles.heading}>
          {isSignup ? 'Create your account' : 'Welcome back'}
        </Text>
        <Text style={styles.subtitle}>
          {isSignup
            ? 'Join Connectly and stay close to everyone.'
            : 'Sign in to continue your conversations.'}
        </Text>

        <Text style={styles.label}>Email address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#8C91A8"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#8C91A8"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleAuth}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>
              {isSignup ? 'Create account' : 'Sign in'}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsSignup(!isSignup)}
          style={styles.switchButton}
        >
          <Text style={styles.switchText}>
            {isSignup
              ? 'Already have an account? Sign in'
              : "Don't have an account? Sign up"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          Connect with the people who matter.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101329',
    justifyContent: 'center',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 28,
  },
  logo: {
    color: '#A78BFA',
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 35,
    textAlign: 'center',
  },
  heading: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    color: '#B9BCD0',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 35,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 9,
  },
  input: {
    backgroundColor: '#20243E',
    borderColor: '#353A5C',
    borderWidth: 1,
    borderRadius: 12,
    color: '#FFFFFF',
    padding: 16,
    fontSize: 16,
    marginBottom: 22,
  },
  button: {
    backgroundColor: '#7957E8',
    padding: 17,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  switchButton: {
    alignItems: 'center',
    padding: 20,
  },
  switchText: {
    color: '#B9A5FF',
    fontSize: 14,
  },
  footer: {
    color: '#777D9A',
    textAlign: 'center',
    marginTop: 25,
  },
  welcome: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 25,
  },
});
