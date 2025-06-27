import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import {
  createPersonal,
  getPersonalById,
  updatePersonal,
} from "../services/PersonalServices";
import { useNavigation, useRoute } from "@react-navigation/native";
import { maskCPF, maskPhone } from "../utils/maskUtils";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function PersonalRegisterPage() {
  const [data, setData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    dataNascimento: "",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPersonalById(id);
        const personal = result[0];
        setData({
          nome: personal.nome || "",
          email: personal.email || "",
          telefone: personal.telefone || "",
          cpf: personal.cpf || "",
          dataNascimento: personal.dataNascimento || "",
        });
      } catch (err) {
        Alert.alert("Erro", "Erro ao buscar personal.");
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleSubmit = async () => {
    const isFormValid = Object.values(data).every((val) => val.trim() !== "");

    if (!isFormValid) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      if (id) {
        await updatePersonal(id, data);
        Alert.alert("Sucesso", "Personal atualizado com sucesso.");
      } else {
        await createPersonal(data);
        Alert.alert("Sucesso", "Personal registrado com sucesso.");
      }
      navigation.goBack();
    } catch (err) {
      Alert.alert("Erro", "Erro ao salvar personal.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={data.nome}
        onChangeText={(value) => setData({ ...data, nome: value })}
        placeholder="Nome"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={data.email}
        onChangeText={(value) => setData({ ...data, email: value })}
        placeholder="Email"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Telefone</Text>
      <TextInput
        style={styles.input}
        value={data.telefone}
        onChangeText={(value) =>
          setData({ ...data, telefone: maskPhone(value) })
        }
        placeholder="(00) 00000-0000"
        keyboardType="phone-pad"
        maxLength={15}
      />

      <Text style={styles.label}>CPF</Text>
      <TextInput
        style={styles.input}
        value={data.cpf}
        onChangeText={(value) => setData({ ...data, cpf: maskCPF(value) })}
        placeholder="CPF"
        keyboardType="numeric"
        maxLength={14}
      />

      <Text style={styles.label}>Data de Nascimento</Text>
      <TextInput
        style={styles.input}
        value={data.dataNascimento}
        placeholder="YYYY-MM-DD"
        onChangeText={(value) => setData({ ...data, dataNascimento: value })}
        // onFocus={() => setShowDatePicker(true)}
      />

      {/* {showDatePicker && (
        <DateTimePicker
          mode="date"
          display="default"
          value={
            data.dataNascimento ? new Date(data.dataNascimento) : new Date()
          }
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setData({
                ...data,
                dataNascimento: selectedDate.toISOString().split("T")[0],
              });
            }
          }}
        />
      )} */}

      <View style={styles.button}>
        <Button title={id ? "Atualizar" : "Registrar"} onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
    backgroundColor: "#fff",
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
  },
  button: {
    marginTop: 20,
  },
});
