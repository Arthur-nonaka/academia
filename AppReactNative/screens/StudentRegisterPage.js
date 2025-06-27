import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView, // For scrollable content if the form is long
  Platform, // To check platform for specific UI (like date picker)
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

// Assuming these services are platform-agnostic (using fetch/axios)
import {
  createStudent,
  getStudentById,
  updateStudent,
} from "../services/StudentServices";
// These utility functions should work fine as they are pure JS
import { maskCPF, maskPhone } from "../utils/maskUtils";

const StudentRegisterPage = () => {
  const [data, setData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    dataNascimento: "",
    endereco: "",
  });

  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params || {};

  useEffect(() => {
    const fetchStudent = async (studentId) => {
      try {
        const result = await getStudentById(studentId);
        const student = result[0];
        console.log(student);
        setData({
          nome: student.nome || "",
          email: student.email || "",
          telefone: student.telefone || "",
          cpf: student.cpf || "",
          dataNascimento: student.dataNascimento || "",
          endereco: student.endereco || "",
        });
      } catch (err) {
        console.log("Error fetching student: " + err);
        Alert.alert("Erro", "Erro ao buscar aluno."); // Use React Native Alert
      }
    };

    if (id) {
      fetchStudent(id);
    }
  }, [id]);

  // Unified handleChange for all inputs
  const handleChange = (name, value) => {
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    // Check if all fields are filled
    const isFormValid = Object.values(data).every(
      (value) => value.trim() !== ""
    );

    if (!isFormValid) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos.");
      return;
    }

    if (id) {
      // Update existing student
      try {
        await updateStudent(id, data);
        Alert.alert("Sucesso", "Aluno atualizado com sucesso!");
        // Reset form data after successful update (optional)
        setData({
          nome: "",
          email: "",
          telefone: "",
          cpf: "",
          dataNascimento: "",
          endereco: "",
        });
        navigation.navigate("Lista de Alunos"); // Navigate back to student list
      } catch (err) {
        console.log("Erro ao atualizar aluno: " + err);
        Alert.alert("Erro", "Erro ao atualizar aluno. Tente novamente.");
      }
    } else {
      // Create new student
      try {
        const response = await createStudent(data);
        console.log("Student created:", response);
        Alert.alert("Sucesso", "Aluno registrado com sucesso!");
        // Reset form data after successful creation (optional)
        setData({
          nome: "",
          email: "",
          telefone: "",
          cpf: "",
          dataNascimento: "",
          endereco: "",
        });
        navigation.navigate("Lista de Alunos"); // Navigate back to student list
      } catch (error) {
        console.error("Erro ao registrar aluno:", error);
        Alert.alert("Erro", "Erro ao registrar aluno. Tente novamente.");
      }
    }
  };

  // State for date picker visibility (if using a native date picker)
  // const [showDatePicker, setShowDatePicker] = useState(false);

  // const onDateChange = (event: any, selectedDate?: Date) => {
  //   setShowDatePicker(Platform.OS === 'ios'); // For iOS, keeps picker open until user confirms
  //   if (selectedDate) {
  //     const formattedDate = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD
  //     handleChange('dataNascimento', formattedDate);
  //   }
  // };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={data.nome}
              onChangeText={(text) => handleChange("nome", text)}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={data.email}
              onChangeText={(text) => handleChange("email", text)}
              keyboardType="email-address" // Optimized keyboard for email
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Telefone</Text>
            <TextInput
              style={styles.input}
              placeholder="(00) 00000-0000"
              value={maskPhone(data.telefone)} // Apply mask to display
              onChangeText={(text) => handleChange("telefone", maskPhone(text))} // Apply mask on change
              keyboardType="phone-pad" // Optimized keyboard for phone
              maxLength={15} // Enforce max length of masked phone
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>CPF</Text>
            <TextInput
              style={styles.input}
              placeholder="000.000.000-00"
              value={maskCPF(data.cpf)} // Apply mask to display
              onChangeText={(text) => handleChange("cpf", maskCPF(text))} // Apply mask on change
              keyboardType="numeric" // Optimized keyboard for numbers
              maxLength={14} // Enforce max length of masked CPF
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Data de Nascimento</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD" // Guide user for format
              value={data.dataNascimento}
              onChangeText={(text) => handleChange("dataNascimento", text)}
              keyboardType="numbers-and-punctuation" // Or 'default', or use a DatePicker
              // Uncomment and integrate a DatePicker library for a better UX
              // onFocus={() => setShowDatePicker(true)}
            />
            {/* {showDatePicker && (
              <DateTimePicker
                value={data.dataNascimento ? new Date(data.dataNascimento) : new Date()}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )} */}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Endereço</Text>
            <TextInput
              style={styles.input}
              placeholder="Endereço"
              value={data.endereco}
              onChangeText={(text) => handleChange("endereco", text)}
            />
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
    flexGrow: 1, // Allows content to grow and scroll
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
  input: {
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
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

export default StudentRegisterPage;
