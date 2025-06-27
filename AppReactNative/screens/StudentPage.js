import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList, // Usaremos FlatList para renderizar a lista de alunos
  Alert, // Para exibir alertas nativos
  ScrollView, // Para o formulário de filtros, se for muito grande
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Para navegação

// Assumindo que seus serviços de API são agnósticos à plataforma.
import { getStudents, deleteStudent } from "../services/StudentServices";
import { maskCPF, maskPhone } from "../utils/maskUtils"; // As máscaras provavelmente podem ser reutilizadas

const StudentPage = () => {
  const [students, setStudents] = useState([]);
  const [filters, setFilters] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    dataNascimento: "",
  });

  const navigation = useNavigation();

  const fetchStudents = useCallback(async () => {
    try {
      // É importante que getStudents possa receber um objeto de filtros
      const data = await getStudents(filters);
      setStudents(data);
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
      Alert.alert("Erro", "Erro ao carregar a lista de alunos.");
    }
  }, [filters]);

  useEffect(() => {
    // Adicionando um listener para quando a tela for focada
    // Isso garante que a lista seja atualizada ao retornar de uma tela de registro/edição
    const unsubscribe = navigation.addListener("focus", () => {
      fetchStudents();
    });

    // Retorna uma função de limpeza para remover o listener
    return unsubscribe;
  }, [navigation, fetchStudents]); // Dependência de fetchStudents para garantir que a função mais recente seja usada

  const handleDelete = async (id) => {
    Alert.alert(
      "Confirmação",
      "Tem certeza que deseja excluir este aluno?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: async () => {
            try {
              await deleteStudent(id);
              fetchStudents(); // Atualiza a lista após a exclusão
              Alert.alert("Sucesso", "Aluno excluído com sucesso!");
            } catch (error) {
              console.error("Erro ao excluir aluno:", error);
              Alert.alert("Erro", "Erro ao excluir o aluno.");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleUpdate = (id) => {
    navigation.navigate("Registrar Aluno", { id }); // Navega para a tela de registro/atualização
  };

  const handleRefresh = () => {
    // Reaplicar os filtros atuais ou rebuscar sem filtros se desejar "resetar"
    fetchStudents();
  };

  const handleClearFilters = () => {
    setFilters({
      nome: "",
      email: "",
      telefone: "",
      cpf: "",
      dataNascimento: "",
    });
  };

  // Componente para renderizar cada item da lista (linha da tabela)
  const renderStudentItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={[styles.tableCell, styles.cellName]}>{item.nome}</Text>
      <Text style={styles.tableCell}>{item.email}</Text>
      <Text style={styles.tableCell}>{maskPhone(item.telefone)}</Text>
      <Text style={styles.tableCell}>{maskCPF(item.cpf)}</Text>
      <Text style={styles.tableCell}>{item.dataNascimento}</Text>
      <Text style={styles.tableCell}>{item.dataCadastro}</Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => handleUpdate(item.id)}
        >
          <Text style={styles.buttonTextSmall}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.buttonTextSmall}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, styles.cellName]}>Nome</Text>
          <Text style={styles.tableHeaderCell}>Email</Text>
          <Text style={styles.tableHeaderCell}>Telefone</Text>
          <Text style={styles.tableHeaderCell}>CPF</Text>
          <Text style={styles.tableHeaderCell}>Nascimento</Text>
          <Text style={styles.tableHeaderCell}>Cadastro</Text>
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={handleRefresh}
          >
            <Text style={styles.refreshButtonText}>⟳</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de Alunos */}
        <FlatList
          data={students}
          keyExtractor={(item) => item.id}
          renderItem={renderStudentItem}
          ListEmptyComponent={
            <Text style={styles.noDataText}>Nenhum aluno encontrado.</Text>
          }
        />
      </View>
    </View>
  );
};

// ---
// Estilos para os componentes React Native
// ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  breadcrumbContainer: {
    marginBottom: 20,
  },
  breadcrumbActive: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  registerButton: {
    backgroundColor: "#28a745", // Verde para "Registrar"
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  filtersForm: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  formGroup: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  clearFiltersButton: {
    backgroundColor: "#6c757d", // Cinza para "Limpar Filtros"
  },
  tableContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: "hidden", // Importante para bordas arredondadas e FlatList
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#e9ecef",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#dee2e6",
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    paddingHorizontal: 5,
  },
  refreshButton: {
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  refreshButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6c757d",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
    alignItems: "center",
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    textAlign: "center",
    paddingHorizontal: 5,
  },
  cellName: {
    flex: 1.5, // Dá um pouco mais de espaço para o nome
    textAlign: "left",
    paddingLeft: 10,
  },
  actionButtons: {
    flexDirection: "row",
    flex: 0.8, // Espaço para os botões de ação
    justifyContent: "space-around",
    paddingHorizontal: 5,
  },
  actionButton: {
    padding: 8,
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: "#ffc107", // Amarelo para editar
  },
  deleteButton: {
    backgroundColor: "#dc3545", // Vermelho para deletar
    marginLeft: 5,
  },
  buttonTextSmall: {
    color: "#fff",
    fontSize: 14,
  },
  noDataText: {
    textAlign: "center",
    padding: 20,
    fontSize: 16,
    color: "#666",
  },
});

export default StudentPage;
