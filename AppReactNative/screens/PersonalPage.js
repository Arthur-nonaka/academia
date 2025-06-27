import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { getPersonals, deletePersonal } from "../services/PersonalServices";
import { useNavigation } from "@react-navigation/native";

export default function PersonalPage() {
  const [personals, setPersonals] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const loadPersonals = async () => {
    try {
      const data = await getPersonals();
      setPersonals(data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os personais.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePersonal(id);
      setPersonals((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      Alert.alert("Erro", "Não foi possível excluir o personal.");
    }
  };

  const handleUpdate = (id) => {
    navigation.navigate("Registrar Professor", { id }); // Navega para a tela de registro/atualização
  };

  useEffect(() => {
    loadPersonals();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={[styles.tableCell, styles.cellName]}>{item.nome}</Text>
      <Text style={styles.tableCell}>{item.email}</Text>
      <Text style={styles.tableCell}>{item.telefone}</Text>
      <Text style={styles.tableCell}>{item.cpf}</Text>
      <Text style={styles.tableCell}>{item.dataNascimento}</Text>
      <Text style={styles.tableCell}>{item.dataAdmissao}</Text>
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

  if (loading) {
    return <ActivityIndicator size="large" color="#000" style={{ flex: 1 }} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, styles.cellName]}>Nome</Text>
          <Text style={styles.tableHeaderCell}>Email</Text>
          <Text style={styles.tableHeaderCell}>Telefone</Text>
          <Text style={styles.tableHeaderCell}>CPF</Text>
          <Text style={styles.tableHeaderCell}>Nascimento</Text>
          <Text style={styles.tableHeaderCell}>Admissao</Text>
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={loadPersonals}
          >
            <Text style={styles.refreshButtonText}>⟳</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={personals}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={<Text>Nenhum personal encontrado.</Text>}
        />
      </View>
    </View>
  );
}

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
