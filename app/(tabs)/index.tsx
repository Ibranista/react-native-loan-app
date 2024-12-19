import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { LoanContext } from '../../context/LoanContext';

export default function DashboardScreen() {
  const { loans, repayLoan } = useContext(LoanContext);
  const [repayInputs, setRepayInputs] = useState({});

  const handleRepayChange = (id, value) => {
    setRepayInputs(prev => ({ ...prev, [id]: value }));
  };

  const handleRepay = (id) => {
    if (!repayInputs[id]) return;
    repayLoan(id, repayInputs[id]);
    setRepayInputs(prev => ({ ...prev, [id]: '' }));
  };

  const renderLoan = ({ item }) => (
    <View style={styles.loanItem}>
      <View style={{ flex: 1 }}>
        <Text style={styles.loanText}>Amount: {item.amount}</Text>
        <Text style={styles.loanText}>Duration: {item.duration} months</Text>
        <Text style={styles.loanText}>Status: {item.status}</Text>
      </View>
      {item.status === 'Active' && (
        <View style={styles.repaySection}>
          <TextInput
            style={styles.repayInput}
            placeholder="Repay Amount"
            keyboardType="numeric"
            value={repayInputs[item.id] || ''}
            onChangeText={(text) => handleRepayChange(item.id, text)}
          />
          <Button title="Repay" onPress={() => handleRepay(item.id)} />
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Loan Dashboard</Text>
      <FlatList
        data={loans || []}
        keyExtractor={(loan) => loan.id.toString()}
        renderItem={renderLoan}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  loanItem: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row'
  },
  loanText: { fontSize: 16, marginBottom: 5 },
  repaySection: { marginLeft: 10, justifyContent: 'center' },
  repayInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 5,
    width: 100,
    padding: 5,
    borderRadius: 5
  },
});