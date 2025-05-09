# 🛠️ Sistema de Acesso Inteligente – Back-End (Node.js + TypeScript)

Este é o repositório do **back-end** do sistema. Ele é responsável por fornecer os dados ao front-end, gerenciar autenticações e conexões com o banco de dados, além de lidar com a lógica de negócio através de uma arquitetura bem estruturada.

---

## ⚙️ Arquitetura do Projeto – MCMR

O projeto segue o padrão **MCMR**, dividido em:

- **Models**: definem a interação com o banco de dados, onde são escritas as instruções SQL para realizar consultas, inserções, atualizações e exclusões.
- **Controllers**: responsáveis por chamar os métodos dos models e retornar respostas apropriadas com status HTTP (ex: 200, 400, 401).
- **Middlewares**: realizam verificações e validações nas requisições, como conferir se campos existem, estão preenchidos ou se não são `undefined`.
- **Routes**: onde estão definidas as rotas da API REST com os métodos HTTP (GET, POST, PUT, PATCH, DELETE).

---

## 📦 Tecnologias e Bibliotecas

O projeto foi desenvolvido com:

- **Node.js** e **TypeScript** – Ambiente de execução e linguagem tipada.
- **Express** – Framework para criação de APIs.
- **dotenv** – Carrega variáveis de ambiente do `.env`.
- **mysql2/promise** – Biblioteca para conexão assíncrona com MySQL.
- **cors** – Permite requisições de origens diferentes (CORS).
- **JWT (jsonwebtoken)** – Geração e verificação de tokens para autenticação.

### 📥 Instalação das dependências

Certifique-se de que o **TypeScript** e seus tipos também estejam instalados para o projeto funcionar corretamente com Node.js.

Instale tudo com apenas um comando:

```bash
npm install
```

Caso queira instalar individualmente:

```bash
npm install express
npm install dotenv
npm install mysql2
npm install cors
npm install jsonwebtoken
npm install typescript --save-dev
```

---

## 🗂️ Estrutura do Projeto

```bash
├── node_modules/
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   └── routes/
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
├── index.ts
```

---

## ▶️ Como executar o projeto

Após instalar as dependências, basta rodar o servidor com:

```bash
npx ts-node-dev src/index.ts
```

- O servidor principal está definido em `index.ts`
- As rotas da API de **usuário** já estão **totalmente concluídas**
- A autenticação gera um **token JWT** no login
- Testes foram realizados com o **Insomnia**

---

## 🗺️ Integração com APIs externas

Este projeto utilizará diferentes APIs para enriquecer a experiência e funcionalidade da aplicação. Até o momento:

- **Google Maps API**: A integração parcialmente concluida **ainda foi feita no agendamento(falta em unidades proximas**, mas será utilizada para fornecer mapas interativos no front-end.
- **API de Inteligência Artificial (IA)**: Será utilizada futuramente para simular um assistente virtual no front-end. A integração dependerá da disponibilidade de chave de acesso.
- **API do Moovit**: Planejada para fornecer rotas e horários de ônibus com base na localização. Ainda não foi integrada e dependerá da liberação da API.

---

## 🧾 Banco de Dados

Atualmente, o banco conta com as tabelas:

- **usuario**
- **agendamento**

A manipulação dessas tabelas está centralizada nos arquivos de `models` e `controllers`.

---

## 🚀 Deploy

Em breve será adicionado o processo de deploy, incluindo instruções para subir o projeto em ambiente de produção (ex: Railway, Render ou servidor VPS).

---

## ❓ Suporte

Em caso de dúvidas ou dificuldades, abra uma **issue** ou entre em contato com o time do projeto.

---

Desafio Trilhas Inova 🚀
