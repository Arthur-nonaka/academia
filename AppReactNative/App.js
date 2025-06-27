import HomeScreen from "./screens/HomeScreen";
import PersonalRegisterPage from "./screens/PersonalRegisterPage";
import PersonalPage from "./screens/PersonalPage";
import StudentPage from "./screens/StudentPage";
import StudentRegisterPage from "./screens/StudentRegisterPage";
import PlanPage from "./screens/PlanPage";
import PlanRegisterPage from "./screens/PlanRegisterPage";
import SubscriptionPage from "./screens/SubscriptionPage";
import SubscriptionRegisterPage from "./screens/SubscriptionRegisterPage";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

export default function App() {
  function DrawerNavigation() {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Lista de Professores" component={PersonalPage} />
        <Drawer.Screen
          name="Registrar Professor"
          component={PersonalRegisterPage}
        />
        <Drawer.Screen name="Lista de Alunos" component={StudentPage} />
        <Drawer.Screen
          name="Registrar Aluno"
          component={StudentRegisterPage}
        />
        <Drawer.Screen name="Lista de Planos" component={PlanPage} />
        <Drawer.Screen
          name="Registrar Plano"
          component={PlanRegisterPage}
        />
        <Drawer.Screen name="Lista de Assinaturas" component={SubscriptionPage} />
        <Drawer.Screen
          name="Registrar Assinatura"
          component={SubscriptionRegisterPage}
        />
      </Drawer.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <DrawerNavigation />
    </NavigationContainer>
  );
}
