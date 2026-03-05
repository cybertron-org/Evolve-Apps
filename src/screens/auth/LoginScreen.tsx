import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { colors } from '../../theme/colors';

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement login logic here
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' as never }],
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>Sign in to continue your journey</Text>
      </View>

      <View style={styles.form}>
        <Input
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Input
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <Button
          title="Sign In"
          onPress={handleLogin}
          style={styles.loginButton}
        />

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.socialButtons}>
          <Button
            title="Google"
            onPress={() => {}}
            variant="social"
            style={styles.socialButton}
            textStyle={{ color: colors.social.google }}
          />
          <Button
            title="Facebook"
            onPress={() => {}}
            variant="social"
            style={styles.socialButton}
            textStyle={{ color: colors.social.facebook }}
          />
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: colors.background.light,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text.light,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.muted,
  },
  form: {
    marginBottom: 20,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: colors.accent,
    marginBottom: 24,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  orText: {
    marginHorizontal: 16,
    color: colors.text.muted,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialButton: {
    flex: 0.48,
    borderWidth: 1,
    borderColor: colors.border,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: colors.text.muted,
  },
  signupText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
});
