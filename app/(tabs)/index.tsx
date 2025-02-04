import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { DollarSign, Home, TrendingUp, Percent, ArrowRight } from 'react-native-feather';

const CurrencyConverter = () => {
  const [usdAmount, setUsdAmount] = useState('');
  const [bankGhs, setBankGhs] = useState('');
  const [forexGhs, setForexGhs] = useState('');
  const [effectiveRate, setEffectiveRate] = useState('');
  const [bestRate, setBestRate] = useState(''); // New state to track the best rate
  const [bankRate, setBankRate] = useState('15.2');
  const [forexRate, setForexRate] = useState('16.2');
  const [withdrawalCharge, setWithdrawalCharge] = useState('3');

  const handleCalculate = () => {
    const amount = parseFloat(usdAmount);
    const bankExchangeRate = parseFloat(bankRate);
    const forexExchangeRate = parseFloat(forexRate);
    const charge = parseFloat(withdrawalCharge) / 100;

    if (!isNaN(amount) && amount > 0 && !isNaN(bankExchangeRate) && !isNaN(forexExchangeRate) && !isNaN(charge)) {
      const bankAmount = amount * bankExchangeRate;
      const forexAmount = amount * forexExchangeRate * (1 - charge);
      const effectiveExchangeRate = forexAmount / amount;

      setBankGhs(bankAmount.toFixed(2));
      setForexGhs(forexAmount.toFixed(2));
      setEffectiveRate(effectiveExchangeRate.toFixed(2));

      // Determine the best rate and display it
      const bestRateValue = bankAmount > forexAmount ? bankAmount : forexAmount;
      setBestRate(bestRateValue.toFixed(2));

      // Dismiss the keyboard here after the calculation
      Keyboard.dismiss();
    } else {
      alert('Please enter valid values');
    }
  };

  const InputField = ({ icon, label, value, onChangeText, placeholder }) => (
    <View style={styles.inputWrapper}>
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.inputContent}>
        <Text style={styles.inputLabel}>{label}</Text>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#666"
          keyboardType="numeric"
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );

  const ResultCard = ({ title, value, subtitle, isBestRate }) => (
    <View style={styles.resultCard}>
      <Text style={styles.resultTitle}>{title}</Text>
      <Text style={styles.resultValue}>{value}</Text>
      {subtitle && <Text style={styles.resultSubtitle}>{subtitle}</Text>}
      {isBestRate && (
        <View style={styles.bestRateTag}>
          <Text style={styles.bestRateText}>Best Rate</Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.title}>Exchange Calculator</Text>
            <Text style={styles.subtitle}>Get the best rates for your exchange</Text>
          </View>

          <View style={styles.inputsContainer}>
            <InputField
              icon={<DollarSign stroke="#276EF1" width={24} height={24} />}
              label="USD Amount"
              value={usdAmount}
              onChangeText={setUsdAmount}
              placeholder="Enter amount"
            />

            <View style={styles.rowInputContainer}>
              <InputField
                icon={<TrendingUp stroke="#276EF1" width={24} height={24} />}
                label="Bank Rate"
                value={bankRate}
                onChangeText={setBankRate}
                placeholder="Bank exchange rate"
              />
              <InputField
                icon={<Percent stroke="#276EF1" width={24} height={24} />}
                label="Forex Rate"
                value={forexRate}
                onChangeText={setForexRate}
                placeholder="Forex exchange rate"
              />
            </View>
              <InputField
                icon={<Home stroke="#276EF1" width={24} height={24} />}
                label="Withdrawal Charge"
                value={withdrawalCharge}
                onChangeText={setWithdrawalCharge}
                placeholder="Charge percentage"
              />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleCalculate}>
            <Text style={styles.buttonText}>Calculate Exchange</Text>
            <ArrowRight stroke="#fff" width={20} height={20} />
          </TouchableOpacity>

          {bankGhs && forexGhs && effectiveRate && (
            <View style={styles.resultsContainer}>
              <ResultCard
                title="Bank Transfer"
                value={`GHS ${bankGhs}`}
                subtitle="Standard bank rate"
                isBestRate={parseFloat(bankGhs) >= parseFloat(forexGhs)}
              />
              <ResultCard
                title="Forex Bureau"
                value={`GHS ${forexGhs}`}
                subtitle="Including withdrawal charge"
                isBestRate={parseFloat(forexGhs) > parseFloat(bankGhs)}
              />
              <ResultCard
                title="Effective Rate"
                value={`${effectiveRate} GHS/USD`}
                subtitle="Final exchange rate"
                isBestRate={false}
              />
            </View>
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    marginTop: 50,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  inputsContainer: {
    gap: 16,
    marginBottom: 24,
  },
  rowInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141414',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#222',
    overflow: 'hidden',
    flex: 1,
  },
  iconContainer: {
    padding: 16,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContent: {
    flex: 1,
    padding: 16,
  },
  inputLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    fontWeight: '500',
  },
  input: {
    fontSize: 16,
    color: '#ffffff',
    padding: 0,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#276EF1',
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultsContainer: {
    gap: 16,
  },
  resultCard: {
    backgroundColor: '#141414',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#222',
    position: 'relative',
  },
  resultTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  resultValue: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: '700',
    marginBottom: 4,
  },
  resultSubtitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  bestRateTag: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FF8C00',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  bestRateText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
});

export default CurrencyConverter;
