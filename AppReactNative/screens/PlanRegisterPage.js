import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  createPlan,
  getPlanById,
  updatePlan,
} from '../services/PlanServices';

const PlanRegisterScreen = () => {
  const [data, setData] = useState({
    nome: '',
    valor: '',
    descricao: '',
    duracao: '',
  });

  const navigation = useNavigation();
  const route = useRoute();
  const { id } = (route.params) || {};

  useEffect(() => {
    const fetchPlan = async (planId) => {
      try {
        const result = await getPlanById(planId);
        const plan = result[0];
        setData({
          nome: plan.nome || '',
          valor: plan.valor || '',
          descricao: plan.descricao || '',
          duracao: plan.duracao || '',
        });
      } catch (err) {
        console.log('Error fetching plan: ' + err);
        Alert.alert('Erro', 'Erro ao buscar plano.');
      }
    };

    if (id) {
      fetchPlan(id);
    }
  }, [id]);

  const handleChange = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async () => {
    if (!data.nome || !data.valor || !data.descricao || !data.duracao) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }

    if (id) {
      try {
        await updatePlan(id, data);
        setData({
          nome: '',
          valor: '',
          duracao: '',
          descricao: '',
        });
        navigation.navigate('Lista de Planos');
      } catch (err) {
        console.log('Erro ao atualizar plano: ' + err);
        Alert.alert('Erro', 'Erro ao atualizar plano.' + err);
      }
    } else {
      try {
        const response = await createPlan(data);
        console.log('Plan created:', response);
        setData({
          nome: '',
          valor: '',
          descricao: '',
          duracao: '',
        });
        navigation.navigate('Lista de Planos');
      } catch (error) {
        console.error('Erro ao registrar plano:', error);
        Alert.alert('Erro', 'Erro ao registrar plano. Tente novamente.');
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* Form */}
        <View style={styles.form}>
          {/* Nome Field */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              value={data.nome}
              onChangeText={(value) => handleChange('nome', value)}
              placeholder="Nome"
              placeholderTextColor="#999"
            />
          </View>

          {/* Row with Valor and Descricao */}
          <View style={styles.row}>
            <View style={[styles.formGroup, styles.halfWidth]}>
              <Text style={styles.label}>Valor</Text>
              <TextInput
                style={styles.input}
                value={data.valor}
                onChangeText={(value) => handleChange('valor', value)}
                placeholder="Valor"
                placeholderTextColor="#999"
                keyboardType="numeric"
              />
            </View>

            <View style={[styles.formGroup, styles.halfWidth]}>
              <Text style={styles.label}>Descrição</Text>
              <TextInput
                style={styles.input}
                value={data.descricao}
                onChangeText={(value) => handleChange('descricao', value)}
                placeholder="Descrição"
                placeholderTextColor="#999"
              />
            </View>
          </View>

          {/* Duracao Field */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Duração (mês)</Text>
            <TextInput
              style={styles.input}
              value={data.duracao}
              onChangeText={(value) => handleChange('duracao', value)}
              placeholder="Duração"
              placeholderTextColor="#999"
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>
              {id ? 'Atualizar' : 'Registrar'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    padding: 16,
  },
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
  },
  breadcrumbLink: {
    color: '#007bff',
    fontSize: 14,
  },
  breadcrumbSeparator: {
    color: '#6c757d',
    fontSize: 14,
  },
  breadcrumbActive: {
    color: '#6c757d',
    fontSize: 14,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formGroup: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#495057',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#495057',
  },
  submitButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default PlanRegisterScreen;