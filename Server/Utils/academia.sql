CREATE DATABASE IF NOT EXISTS academia;
USE academia;

-- Tabela ALUNO
CREATE TABLE IF NOT EXISTS aluno (
    id_aluno INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    data_nascimento DATE,
    cpf VARCHAR(14),
    email VARCHAR(100),
    telefone VARCHAR(20),
    endereco VARCHAR(200),
    data_cadastro DATE
) ENGINE = InnoDB;

-- Tabela PROFESSOR
CREATE TABLE IF NOT EXISTS professor (
    id_professor INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    data_nascimento DATE,
    cpf VARCHAR(14),
    email VARCHAR(100),
    telefone VARCHAR(20),
    data_admissao DATE
) ENGINE = InnoDB;

-- Tabela PLANO
CREATE TABLE IF NOT EXISTS plano (
    id_plano INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(255),
    valor DECIMAL(10,2),
    duracao INT
) ENGINE = InnoDB;

-- Tabela MATRICULA
CREATE TABLE IF NOT EXISTS matricula (
    id_matricula INT AUTO_INCREMENT PRIMARY KEY,
    data_matricula DATE NOT NULL,
    status VARCHAR(20),
    id_aluno INT NOT NULL,
    id_professor INT NOT NULL,
    id_plano INT NOT NULL,
    CONSTRAINT fk_matricula_aluno
        FOREIGN KEY (id_aluno) 
        REFERENCES aluno(id_aluno)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_matricula_professor
        FOREIGN KEY (id_professor) 
        REFERENCES professor(id_professor)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_matricula_plano
        FOREIGN KEY (id_plano) 
        REFERENCES plano(id_plano)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE = InnoDB;
