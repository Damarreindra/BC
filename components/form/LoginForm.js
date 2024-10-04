import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Button from '../Button';


export default function MyForm() {
  const { control, handleSubmit, formState: { errors }, register, setValue } = useForm();

  // Manual validation
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!regex.test(email)) return 'Invalid email format';
    return true;
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return true;
  };

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <View style={styles.container}>

      <View style={styles.inputContainer}>
      <Text style={styles.label}>Email</Text>
      <Controller
        control={control}
        name="email"
        rules={{ validate: validateEmail }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder='Enter Username'

          />
        )}
      />
      {errors.email && <Text>{errors.email.message}</Text>}
      </View>

      <View style={styles.inputContainer}>
      <Text style={styles.label}>Password</Text>
      <Controller
        control={control}
        name="password"
        rules={{ validate: validatePassword }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
            placeholder='Enter Password'
          />
        )}
      />
      {errors.password && <Text>{errors.password.message}</Text>}
      </View>
    

      <Button label={"Login"} theme={"primary"}/>
     
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex:1,
    alignItems:"center"
  },
  inputContainer:{
    marginBottom: 12

  },
  input: {
    borderColor: '#A9A9',
    borderWidth: 1,
    borderRadius:8,
    width:340,
    padding: 12,
    marginBottom: 8,
  },
  label:{
    fontSize:16,
    marginBottom:8
  }
});
