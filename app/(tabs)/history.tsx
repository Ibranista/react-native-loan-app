import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { LoanContext } from '../../context/LoanContext';

export default function HistoryScreen() {
  const { loans } = useContext(LoanContext);
  const paidLoans = loans.filter(loan => loan.status === 'Paid');

  const renderLoan = ({ item }) => (
    <View style={styles.loanItem}>
      <Text style={styles.loanText}>Amount: {item.amount}</Text>
      <Text style={styles.loanText}>Duration: {item.duration} months</Text>
      <Text style={styles.loanText}>Status: {item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Paid Loans History</Text>
      {paidLoans.length === 0 ? (
        <Text>No paid loans yet.</Text>
      ) : (
        <FlatList
          data={paidLoans}
          keyExtractor={(loan) => loan.id.toString()}
          renderItem={renderLoan}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
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
    marginBottom: 10
  },
  loanText: { fontSize: 16, marginBottom: 5 },
});
