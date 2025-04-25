import { useEffect, useState } from "react";
import { Breadcrumb, Button, Col, Container, Form, Row } from "react-bootstrap";
import {
  createStudent,
  getStudentById,
  updateStudent,
} from "../../services/StudentServices";
import { maskCPF, maskPhone } from "../../utils/maskUtils";
import { useNavigate, useParams } from "react-router-dom";

const StudentRegisterPage = () => {
  const [data, setData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    dataNascimento: "",
    endereco: "",
  });

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchStudent = async (id: string) => {
      try {
        const result = await getStudentById(id);
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
        alert("Erro ao buscar aluno.");
      }
    };

    if (id) {
      fetchStudent(id);
    }
  }, [id]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const isFormValid = Object.values(data).every(
      (value) => value.trim() !== ""
    );

    if (!isFormValid) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (id) {
      try {
        await updateStudent(id, data);
        setData({
          nome: "",
          email: "",
          telefone: "",
          cpf: "",
          dataNascimento: "",
          endereco: "",
        });
        navigate("/alunos");
      } catch (err) {
        console.log("Erro ao atualizar aluno: " + err);
        alert("Erro ao atualizar aluno." + err);
      }
    } else {
      try {
        const response = await createStudent(data);
        console.log("Student created:", response);
        setData({
          nome: "",
          email: "",
          telefone: "",
          cpf: "",
          dataNascimento: "",
          endereco: "",
        });
        navigate("/alunos");
      } catch (error) {
        console.error("Erro ao registrar aluno:", error);
        alert("Erro ao registrar aluno. Tente novamente.");
      }
    }
  };

  return (
    <Container>
      <Breadcrumb>
        <Breadcrumb.Item href="/alunos">Alunos</Breadcrumb.Item>
        <Breadcrumb.Item active>
          {id ? "Atualizar" : "Registrar"} Aluno
        </Breadcrumb.Item>
      </Breadcrumb>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={data.nome}
                onChange={handleChange}
                placeholder="Nome"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                type="text"
                name="telefone"
                value={data.telefone}
                onChange={(e) =>
                  setData({ ...data, telefone: maskPhone(e.target.value) })
                }
                placeholder="(00) 00000-0000"
                maxLength={15}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>CPF</Form.Label>
              <Form.Control
                type="text"
                name="cpf"
                value={data.cpf}
                onChange={(e) =>
                  setData({ ...data, cpf: maskCPF(e.target.value) })
                }
                placeholder="CPF"
                maxLength={14}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control
                type="date"
                name="dataNascimento"
                value={data.dataNascimento}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Form.Group className="mb-3">
            <Form.Label>Endereço</Form.Label>
            <Form.Control
              type="text"
              name="endereco"
              value={data.endereco}
              onChange={handleChange}
              placeholder="Endereço"
            />
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
          {id ? "Atualizar" : "Registrar"}
        </Button>
      </Form>
    </Container>
  );
};

export default StudentRegisterPage;
