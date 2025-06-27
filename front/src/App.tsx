import "./App.css";

import HomePage from "./pages/HomePage";
import { Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import StudentPage from "./pages/Student/StudentPage";
import StudentRegisterPage from "./pages/Student/StudentRegisterPage";
import PersonalPage from "./pages/Personal/PersonalPage";
import PersonalRegisterPage from "./pages/Personal/PersonalRegisterPage";
import PlanPage from "./pages/Plan/PlanPage";
import PlanRegisterPage from "./pages/Plan/PlanRegisterPage";
import SubscriptionPage from "./pages/Subscription/SubscriptionPage";
import SubscriptionRegisterPage from "./pages/Subscription/SubscriptionRegisterPage";

function App() {
  return (
    <Router>
      <Navbar bg="primary" variant="dark" expand="sm">
        <Nav>
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/alunos">
            Alunos
          </Nav.Link>
          <Nav.Link as={Link} to="/personals">
            Personals
          </Nav.Link>
          <Nav.Link as={Link} to="/planos">
            Planos
          </Nav.Link>
          <Nav.Link as={Link} to="/assinaturas">
            Assinaturas
          </Nav.Link>
        </Nav>
      </Navbar>

      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/alunos" element={<StudentPage />} />
          <Route path="/alunos/registrar" element={<StudentRegisterPage />} />
          <Route
            path="/alunos/atualizar/:id"
            element={<StudentRegisterPage />}
          />
          <Route path="/personals" element={<PersonalPage />} />
          <Route
            path="/personals/registrar"
            element={<PersonalRegisterPage />}
          />
          <Route
            path="/personals/atualizar/:id"
            element={<PersonalRegisterPage />}
          />
          <Route path="/planos" element={<PlanPage />} />
          <Route path="/planos/registrar" element={<PlanRegisterPage />} />
          <Route path="/planos/atualizar/:id" element={<PlanRegisterPage />} />
          <Route path="/assinaturas" element={<SubscriptionPage />} />
          <Route
            path="/assinaturas/registrar"
            element={<SubscriptionRegisterPage />}
          />
          <Route
            path="/assinatura/atualizar/:id"
            element={<SubscriptionRegisterPage />}
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
