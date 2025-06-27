import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

import {
  createSubscription,
  getSubscriptionById,
  updateSubscription,
} from "../services/SubscriptionServices";
import { getStudents } from "../services/StudentServices";
import { getPlans } from "../services/PlanServices";
import { getPersonals } from "../services/PersonalServices";

const SubscriptionRegisterPage = () => {
  const [data, setData] = useState({
    status: "",
    idAluno: "",
    idPersonal: "",
    idPlano: "",
  });

  const [prevData, setPrevData] = useState({
    alunos: [],
    personals: [],
    planos: [],
  });

  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params || {};

  useEffect(() => {
    const fetchSubscription = async (subscriptionId) => {
      try {
        const result = await getSubscriptionById(subscriptionId);
        const subscription = result[0];
        setData({
          status: subscription.status || "",
          idAluno: subscription.idAluno || "",
          idPersonal: subscription.idPersonal || "",
          idPlano: subscription.idPlano || "",
        });
      } catch (err) {
        console.log("Error fetching Subscription: " + err);
        Alert.alert("Erro", "Erro ao buscar matrícula.");
      }
    };

    const fetchSelectData = async () => {
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
        console.log("Error fetching prevData: " + err);
        Alert.alert("Erro", "Erro ao carregar dados para os seletores.");
      }
    };

    if (id) {
      fetchSubscription(id);
    }
    fetchSelectData();
  }, [id]);

  const handleChange = (name, value) => {
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    // Input validation
    if (!data.status || !data.idAluno || !data.idPersonal || !data.idPlano) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos.");
      return;
    }

    if (id) {
      // Update existing subscription
      try {
        await updateSubscription(id, data);
        Alert.alert("Sucesso", "Matrícula atualizada com sucesso!");
        // Optionally clear form or navigate after success
        setData({ status: "", idAluno: "", idPersonal: "", idPlano: "" });
        navigation.navigate("MatricuLista de Assinaturas"); // Navigate back to the list page
      } catch (err) {
        console.log("Erro ao atualizar matricula: " + err);
        Alert.alert("Erro", "Erro ao atualizar matrícula. Tente novamente.");
      }
    } else {
      // Create new subscription
      try {
        const response = await createSubscription(data);
        console.log("Subscription created:", response);
        Alert.alert("Sucesso", "Matrícula registrada com sucesso!");
        setData({ status: "", idAluno: "", idPersonal: "", idPlano: "" });
        navigation.navigate("Lista de Assinaturas"); // Navigate back to the list page
      } catch (error) {
        console.error("Erro ao registrar matricula:", error);
        Alert.alert("Erro", "Erro ao registrar matrícula. Tente novamente.");
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Status</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={data.status}
                onValueChange={(itemValue) =>
                  handleChange("status", String(itemValue))
                }
              >
                <Picker.Item label="Selecione o Status" value="" />
                <Picker.Item label="Ativo" value="Ativo" />
                <Picker.Item label="Finalizado" value="Finalizado" />
                <Picker.Item label="Descontinuado" value="Descontinuado" />
              </Picker>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Aluno</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={data.idAluno}
                onValueChange={(itemValue) =>
                  handleChange("idAluno", String(itemValue))
                }
              >
                <Picker.Item label="Selecione o Aluno" value="" />
                {prevData.alunos.map((aluno) => (
                  <Picker.Item
                    key={aluno.id}
                    label={aluno.nome}
                    value={aluno.id}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Professor</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={data.idPersonal}
                onValueChange={(itemValue) =>
                  handleChange("idPersonal", String(itemValue))
                }
              >
                <Picker.Item label="Selecione o Professor" value="" />
                {prevData.personals.map((personal) => (
                  <Picker.Item
                    key={personal.id}
                    label={personal.nome}
                    value={personal.id}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Plano</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={data.idPlano}
                onValueChange={(itemValue) =>
                  handleChange("idPlano", String(itemValue))
                }
              >
                <Picker.Item label="Selecione o Plano" value="" />
                {prevData.planos.map((plano) => (
                  <Picker.Item
                    key={plano.id_plano}
                    label={plano.nome}
                    value={plano.id_plano}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>
              {id ? "Atualizar" : "Registrar"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Allows the ScrollView to grow and enable scrolling
    justifyContent: "center", // Centers content vertically if it doesn't fill the screen
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  breadcrumbContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  breadcrumbItem: {
    color: "#007bff",
    textDecorationLine: "underline",
  },
  breadcrumbSeparator: {
    marginHorizontal: 5,
    color: "#6c757d",
  },
  breadcrumbActive: {
    color: "#6c757d",
  },
  form: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    elevation: 2, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
    color: "#333",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 5,
    backgroundColor: "#fff",
    overflow: "hidden", // Ensures the borderRadius is applied to the Picker
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SubscriptionRegisterPage;
