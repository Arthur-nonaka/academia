import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList, // Para exibir a lista de matrículas
  Alert,    // Para pop-ups de confirmação/erro
  ScrollView, // Para o formulário de filtros, se for muito grande
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Para navegação
import { Picker } from '@react-native-picker/picker'; // Para os selects

import {
  getSubscriptions,
  deleteSubscription,
} from '../services/SubscriptionServices';
import { getStudents } from '../services/StudentServices';
import { getPlans } from '../services/PlanServices';
import { getPersonals } from '../services/PersonalServices';

const SubscriptionPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [filters, setFilters] = useState({
    idAluno: '',
    idPersonal: '',
    idPlano: '',
  });

  const [prevData, setPrevData] = useState({
    alunos: [],
    personals: [],
    planos: [],
  });

  const navigation = useNavigation();

  const fetchSubscriptions = useCallback(async () => {
    try {
      const data = await getSubscriptions(filters);
      setSubscriptions(data);
    } catch (error) {
      console.error('Erro ao buscar matrículas:', error);
      Alert.alert('Erro', 'Erro ao carregar a lista de matrículas.');
    }
  }, [filters]); // Refetch when filters change

  useEffect(() => {
    // Listener para quando a tela for focada (útil ao voltar de registro/atualização)
    const unsubscribe = navigation.addListener('focus', () => {
      fetchSubscriptions();
    });

    // Limpa o listener ao desmontar o componente
    return unsubscribe;
  }, [navigation, fetchSubscriptions]);

  // Carregar dados para os Pickers (alunos, personais, planos)
  useEffect(() => {
    const loadSelectData = async () => {
      try {
        const [students, personals, plans] = await Promise.all([
          getStudents(),
          getPersonals(),
          getPlans(),
        ]);
        setPrevData({
          alunos: students,
          personals: personals,
          planos: plans,
        });
      } catch (err) {
        console.error('Erro ao carregar dados dos filtros:', err);
        Alert.alert('Erro', 'Erro ao carregar opções de filtro.');
      }
    };
    loadSelectData();
  }, []); // Empty dependency array means this runs once on mount

  const handleDelete = async (id) => {
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja excluir esta matrícula?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sim',
          onPress: async () => {
            try {
              await deleteSubscription(id);
              fetchSubscriptions(); // Atualiza a lista
              Alert.alert('Sucesso', 'Matrícula excluída com sucesso!');
            } catch (error) {
              console.error('Erro ao excluir matrícula:', error);
              Alert.alert('Erro', 'Erro ao excluir a matrícula.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleChange = (name, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleUpdate = (id) => {
    navigation.navigate('Registro de Assinatura', { id });
  };

  const handleRefresh = () => {
    fetchSubscriptions();
  };

  const handleClearFilters = () => {
    setFilters({
      idAluno: '',
      idPersonal: '',
      idPlano: '',
    });
  };

  const renderSubscriptionItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={[styles.tableCell, styles.cellAluno]}>
        {prevData.alunos.find((a) => a.id === item.idAluno)?.nome ||
          'N/A'}
      </Text>
      <Text style={styles.tableCell}>
        {prevData.personals.find((p) => p.id === item.idPersonal)?.nome ||
          'N/A'}
      </Text>
      <Text style={styles.tableCell}>
        {prevData.planos.find((pl) => pl.id_plano === item.idPlano)?.nome ||
          'N/A'}
      </Text>
      <Text style={styles.tableCell}>{item.dataMatricula}</Text>
      <Text style={styles.tableCell}>{item.status}</Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => handleUpdate(item.id_matricula || item.id)}>
          <Text style={styles.buttonTextSmall}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDelete(item.id_matricula || item.id)}>
          <Text style={styles.buttonTextSmall}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.breadcrumbContainer}>
        <Text style={styles.breadcrumbActive}>Matrículas</Text>
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, styles.cellAluno]}>Aluno</Text>
          <Text style={styles.tableHeaderCell}>Professor</Text>
          <Text style={styles.tableHeaderCell}>Plano</Text>
          <Text style={styles.tableHeaderCell}>Matrícula</Text>
          <Text style={styles.tableHeaderCell}>Status</Text>
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={fetchSubscriptions}>
            <Text style={styles.refreshButtonText}>⟳</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={subscriptions}
          keyExtractor={(item) => item.id_matricula || item.id}
          renderItem={renderSubscriptionItem}
          ListEmptyComponent={<Text style={styles.noDataText}>Nenhuma matrícula encontrada.</Text>}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  breadcrumbContainer: {
    marginBottom: 20,
  },
  breadcrumbActive: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  registerButton: {
    backgroundColor: '#28a745', // Verde para "Registrar"
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  filtersForm: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  formGroup: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#555',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    backgroundColor: '#fff',
    overflow: 'hidden', // Para garantir que o borderRadius funcione bem
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearFiltersButton: {
    backgroundColor: '#6c757d', // Cinza para "Limpar Filtros"
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden', // Importante para bordas arredondadas e FlatList
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e9ecef',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  refreshButton: {
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  refreshButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6c757d',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    alignItems: 'center',
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  cellAluno: {
    flex: 1.5, // Dá um pouco mais de espaço para o nome do aluno
    textAlign: 'left',
    paddingLeft: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    flex: 0.8, // Espaço para os botões de ação
    justifyContent: 'space-around',
    paddingHorizontal: 5,
  },
  actionButton: {
    padding: 8,
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: '#ffc107', // Amarelo para editar
  },
  deleteButton: {
    backgroundColor: '#dc3545', // Vermelho para deletar
    marginLeft: 5,
  },
  buttonTextSmall: {
    color: '#fff',
    fontSize: 14,
  },
  noDataText: {
    textAlign: 'center',
    padding: 20,
    fontSize: 16,
    color: '#666',
  },
});

export default SubscriptionPage;