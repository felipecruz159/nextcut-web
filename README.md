# Template de Front-end

O template é direcionado a todos que desejam iniciar um front-end com algumas funcionalidades já previamente implementadas.

## 🚀 Funcionalidades

- 🌐 Axios - Biblioteca para requisições HTTP.
- 🎨 shadcn-ui - Biblioteca de componentes UI para React.
- 📅 date-fns - Biblioteca para manipulação de datas.
- 📝 react-hook-form - Biblioteca para manipulação de formulários em React.


##⚙️ Instalação

Para instalar as dependências, utilize um dos seguintes comandos:

```bash
- npm install
- yarn
```

## 🪄 Uso

Para inicializar o projeto, utilize um dos seguintes comandos:

```bash
- yarn dev
- npm run dev
```

Após inicializado, para rodar as migrations utilize um dos seguintes comandos:

```bash
- yarn prisma migrate dev
- npx prisma migrate dev
```

Para gerar o seed, utilize um dos seguintes comandos:

```bash
- yarn prisma db seed
- npx prisma db seed
```

Para gerar o DER (Diagrama de Entidade-Relacionamento), utilize um dos seguintes comandos:

```bash
- yarn prisma generate
- npx prisma generate
```

Para visualizar e manipular os dados das tabelas, utilize um dos seguintes comandos:

```bash
- yarn prisma studio
- npx prisma studio
```

Para rodar os testes, utilize um dos seguintes comandos:

```bash
- yarn test
- npm run test
```
