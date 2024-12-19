import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { LoanContext } from '../../context/LoanContext';

export default function ApplicationFormScreen() {
  const { addLoan } = useContext(LoanContext);
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = () => {
    if (!amount || !duration) return;
    addLoan(amount, duration);
    setAmount('');
    setDuration('');
    // Optionally navigate to Dashboard or just stay on the form
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Apply for a New Loan</Text>
      <TextInput
        style={styles.input}
        placeholder="Loan Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <TextInput
        style={styles.input}
        placeholder="Loan Duration (months)"
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
      />
      <Button title="Submit Loan" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    padding: 10,
    borderRadius: 5
  },
});