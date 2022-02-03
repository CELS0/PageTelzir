<div align="center">
	<img src="readme/logo.png" alt="Telzir logo" height="220">
	<br/>
	<br/>
</div>

<p>
  <a href="#-sobre-o-projeto">📇 Sobre o projeto</a>
  <br/>
  <a href="#-tecnologias">🧰 Tecnologias</a>
   <br/>
   <a href="#-scripts">🔎 Scripts</a>
   <br/>
  <a href="#-como-utilizar">🏎️ Como utilizar</a>
   <br/>
  <a href="#-como-contribuir">🤝 Como contribuir</a>
   <br/>
  <a href="#-licença">📝 Licença</a>
</p>


# 📇 Sobre o projeto

Nós somos a Telzir, a maior empresa telefônica do Brasil. Aqui possibilitamos que as pessoas realizem seus sonhos conectando elas ao mundo! Nosso cargo forte são as ligação inter municipais, afinal o Brasil é dos maiores países em extensão territorial. 

Pensando nisso temos uma página Web que viabiliza a transparente dos planos telefônicos, permitindo que nosso clientes estimem o custo da ligação com base no DDD de origem e destino e na duração da chamada. Além da página exibir o valor que o cliente pagará pela chamada. Para  isso basta apenas torna-se um cliente Telzir cadastrando na nossa página Web.


Obs: É necessário cadastar um usuário administrador no sistema para cadastrar a tabela de preço por minutos e os DDDs, como também os planos que serão disponibilizados aos clientes.   



<div align="center">
	<img src="readme\image.png" alt="telzir" height="200">
</div>





# 🧰 Tecnologias

* API

  * NodeJS

  * Serverless

      ```
    .
    ├── src
    │   ├── functions               # Lambda configuration and source code folder
    │   │   ├── hello
    │   │   │   ├── handler.ts      # `Hello` lambda source code
    │   │   │   ├── index.ts        # `Hello` lambda Serverless configuration
    │   │   │   ├── mock.json       # `Hello` lambda input parameter, if any, for local invocation
    │   │   │   └── schema.ts       # `Hello` lambda input event JSON-Schema
    │   │   │
    │   │   └── index.ts            # Import/export of all lambda configurations
    │   │
    │   └── libs                    # Lambda shared code
    │       └── apiGateway.ts       # API Gateway specific helpers
    │       └── handlerResolver.ts  # Sharable library for resolving lambda handlers
    │       └── lambda.ts           # Lambda middleware
    │
    ├── package.json
    ├── serverless.ts               # Serverless service file
    ├── tsconfig.json               # Typescript compiler configuration
    ├── tsconfig.paths.json         # Typescript paths
    └── webpack.config.js           # Webpack configuration
```

  * TypeScript

  * Jest

  * Docker

  * PostgreSQL

  * Eslint

  * Kubernetes

* Arquitetura 

  * clean architecture

    

* WEB

  * ReactJS

  * Sass

  * Typescript

  * axios


*Mobile 

  * React

  * React native

  * Typescript

  * axios

    

# 🔎 Scripts

**API:**

- `deploy:localhost`: Roda a aplicação em modo de desenvolvimento

- `(npm run | yarn) + test`: Roda os testes automatizados de todos UseCases

- `(npm run | yarn) typeorm migration:run`: Roda as migrations


  

**WEB:**

- `(npm run | yarn)  start`: Roda a aplicação em modo de desenvolvimento


**Mobile**
 - `expo start`: Roda a aplicação em modo de desenvolvimento


 ```

# ⚙️ Como utilizar

Clone o repositório:

```
git clone git clone https://github.com/CELS0/PageTelzir
```

Instale as dependências:

📁./web

```
yarn
```
📁./api

```
yarn
```
📁./app

```
yarn
```

## API Preparando ambiente
**Na API existem dois processos para dar start no banco de dados, escolha o que achar mais familiarizado**


```
1️⃣ Primeira opção:

Usandando kubernetes:

Primeiros passos:

Instalar as dependêcias:
instalação do K3d, do docker e kubectl na máquina 

https://k3d.io/v5.3.0/
https://kubernetes.io/docs/tasks/tools/


Segundo passos:

Executar os seguintes comandos no terminal do diretório:

📁./api/k8s

1 - k3d cluster create <name cluster> --servers 1 --agents 1 -p "8080:30000@loadbalancer"

2 - kubectl apply -f deployment.yml

3 - kubectl get pods

No terminal terá aparecido algo assim ...

NAME                       READY   STATUS   RESTARTS   
postgresdb-f6c5c5c7f-g4z9k   1/1   Running   0          


 kubectl port-forward pod/<name pod> 5432:5432

 Pronto... Agora seu banco de dados foi iniciado✅✅ 

```

```
2️⃣ Segunda opção:

Usandando kubernetes:

Primeiros passos:

Instalar as dependêcias:
instalação do docker e docker-compose na máquina 

https://docs.docker.com/engine/install/ubuntu/
https://docs.docker.com/compose/install/

Segundo passos:

Executar apenass comandos no terminal do diretório:

📁./api

1 -docker-compose up -d

 Pronto... Agora seu banco de dados foi iniciado✅✅ 

```

**Caso seja a primeira execução, será necessário rodar os scripts no diretório da API:**

Para criar as tabelas no banco de dados

```
(npm run | yarn) typeorm migration:run
```

## Mobile Preparando ambiente

```
Primeiros passos:

Instalar as dependêcias:
instalação do expo na máquina 

https://docs.expo.dev/get-started/installation/

Segundo passos:

📁./app/src/services

Mudar a baseURL no arquivo api.ts, para o IP que irá aparecer próximo ao QRcode que deverá ser scaneado com App Expo em seu disposítivo

https://play.google.com/store/apps/details?id=host.exp.exponent

https://apps.apple.com/br/app/expo-go/id982107779


 Pronto... Agora tudo está configurado✅✅ 
```


Para rodar o projeto no modo de desenvolvimento, execute os seguintes scripts em seus respectivos diretórios

📁./api

```
yarn deploy:localhost
```

📁./web

```
yarn start
```
📁./app

```
expo start

Obs: Deve ter o expo instalado em sua máquina de

https://docs.expo.dev/get-started/installation/

```

 **Teste**

📁./api

```
yarn test
```



# 🤝 Como contribuir

- Faça um fork desse repositório;
- Clone esse repositório em sua máquina: `git clone https://github.com/CELS0/PageTelzir`
- Cria uma branch com a sua feature: `git checkout -b minha-feature`;
- Faça commit das suas alterações: `git commit -m 'feat: Minha nova feature'`;
- Faça push para a sua branch: `git push origin minha-feature`.

Depois que o merge da sua pull request for feito, você pode deletar a sua branch.



# 📝 Licença

Esse projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.