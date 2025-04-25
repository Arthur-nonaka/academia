import "./App.css";

import HomePage from "./pages/HomePage";
import { Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import StudentPage from "./pages/Student/StudentPage";
import StudentRegisterPage from "./pages/Student/StudentRegisterPage";
import PersonalPage from "./pages/Personal/PersonalPage";
import PersonalRegisterPage from "./pages/Personal/PersonalRegisterPage";

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
        </Nav>
      </Navbar>

      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/alunos" element={<StudentPage />} />
          <Route path="/alunos/registrar" element={<StudentRegisterPage />} />
          <Route path="/alunos/atualizar/:id" element={<StudentRegisterPage />} />
          <Route path="/personals" element={<PersonalPage />} />
          <Route path="/personals/registrar" element={<PersonalRegisterPage />} />
          <Route path="/personals/atualizar/:id" element={<PersonalRegisterPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
