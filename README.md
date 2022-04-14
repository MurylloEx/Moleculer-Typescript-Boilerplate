<h1 align="center">Moleculer Microservice Boilerplate</h1>
<p align="center">
  <img src="https://raw.githubusercontent.com/moleculerjs/branding/master/logo/logo.png" width="120" alt="React Logo" />
</p>
<h2 align="center">Seminário de Integração de Sistemas</h2>
<p align="center">Boilerplate de Microsserviço feito em Moleculer com TypeScript.</p>
<h4 align="center">Alunos: Lucas Henrique e Muryllo Pimenta</h4>
<p align="center">
  <img src="https://badgen.net/badge/language/TypeScript/blue?icon=label"/> 
  <img src="https://badgen.net/badge/license/MIT/green?icon=label"/>
  <img src="https://badgen.net/badge/authors/Muryllo,%20Lucas/red?icon=label"/>
  <img src="https://badgen.net/badge/backend/Moleculer/orange?icon=label"/>
</p>


# Instruções para o Moleculer.js

**Alunos:** **Lucas Henrique** **e** **Muryllo Pimenta**

## Instalação do Moleculer CLI

Execute o seguinte comando em um terminal não-elevado. `npm install -g moleculer-cli`

## Criando seu Nó / Broker de Microservices

- Clone o repositório que contém o boilerplate do Broker de Microservices totalmente criado em TypeScript. Após fazer isso, rode o **npm install**.
- Como explicamos em nossa apresentação, o Broker é responsável por orquestrar os serviços, ele possui a interação com os transporters, os loaders dos services, o Api Gateway.
- Os Nós podem conter um mesmo serviço compartilhado. Nesse caso, o algoritmo padrão de balanceamento é o Round-Robin, o qual distribui a carga de requisições entre os diferentes Nós mapeando a demanda para esse serviço equivalente em um nó diferente. É um tanto elegante, mas não é perfeito.
- Execute o seguinte comando em um terminal e acesse a pasta resultante do clone:
`git clone https://github.com/MurylloEx/Moleculer-Typescript-Boilerplate.git`

## Criando seu Microservice

- Primeiramente, entenda que um Microservice é ligado a um Nó, esse nó é orquestrado e gerenciado pelo Broker. Você não fará nada sem que o Broker interfira. Por este motivo, todo Microservice recebe a instância do broker injetada via DI (Dependency Injection);
- Sabendo disso, crie um arquivo chamado `todo.service.ts` no diretório `services/` . Após fazer isso, introduza o seguinte trecho de código.

```ts
import { Service, ServiceBroker } from "moleculer";

export default class TodoService extends Service {

  public constructor(public broker: ServiceBroker) {
    super(broker);
    //Todo something
  }

}
```

- Perceba que aqui, você pode definir as `actions` do seu Microservice.
- Como fazer isso? Criando um `esquema de serviço` e mapeando suas `actions` dentro dele.
- Introduza uma leve mudança no seu microservice conforme o código a seguir.

```ts
import { Service, ServiceBroker } from "moleculer";

export default class TodoService extends Service {

  public constructor(public broker: ServiceBroker) {
    super(broker);
    this.parseServiceSchema({
      name: "todo",
      actions: {
        hello: {
          rest: {
            method: "GET",
            path: "/hello",
          },
          async handler(): Promise<string> {
            return "Hello Moleculer";
          },
        },
      },
    });
  }

}
```

## Executando um Nó de Microservices

- Para inicializar o Nó de Microservices, você precisará executar o comando `npm start` ou `yarn start` .
- Vejamos o que acontece ao executar o comando:

![Untitled](https://i.imgur.com/fqap9Lz.png)

---

- Como podemos identificar os nós que nós criamos? Basta executar o comando `nodes` dentro do terminal interativo do Moleculer.

![Untitled](https://i.imgur.com/NaWHFdu.png)

---

- Para visualizar os microservices que criamos anteriormente execute o comando `services`.

![Untitled](https://i.imgur.com/v5jOFZ8.png)

---

- Já para visualizar todas as actions exportadas por este nó criado, execute o comando `actions` e veja todas as funcionalidades de todos os microsserviços da sua aplicação.

![Untitled](https://i.imgur.com/i51JvCq.png)

---

- Por fim, mas não menos importante, vamos ver o resultado do nosso microservice? Invoque a sua action chamada hello dentro do service todo da seguinte forma: `call todo.hello` e veja a saída impressa.

![Untitled](https://i.imgur.com/wHd9BUa.png)

## Autodiscover sobre UDP com transporte TCP

- Certamente criar toda essa arquitetura para transformá-la em um monólito seria completamente inútil. Você provavelmente irá querer dividi-la em shards, conjuntos de nós (fazendo jus ao nome molécula, ao qual os átomos são os microsserviços e a molécula o nó);
- O autodiscover é um recurso que utiliza o conceito de `Multicast baseado em UDP` para que os Nós de Microsservices consigam se interconectar em uma mesma rede automaticamente;
- Para atingir esse efeito, adicione o seguinte trecho na configuração do Moleculer de todos os Nós:

```ts
transporter: {
  type: "TCP",
  options: {
    udpDiscovery: true,
    udpReuseAddr: true,
    udpPort: 4445,
    udpBindAddress: null,
    udpPeriod: 30,
    udpMulticast: "239.0.0.0",
    udpMulticastTTL: 1,
    udpBroadcast: false,
    port: null, //Random TCP port
    urls: null,
    useHostname: true,
    gossipPeriod: 2,
    maxConnections: 32,
    maxPacketSize: 1 * 1024 * 1024            
  }
},
```

- Observe que o recurso foi ativado quando você inicializa o nó novamente.

![Untitled](https://i.imgur.com/ahSUlLQ.png)

- E se os Nós estiverem `por trás de NATs, Firewalls ou até mesmo em redes diferentes`? Você precisará especificar manualmente seus endereços de IP e portas, basta utilizar o campo `urls` da configuração e defini-los.
- Além de especificar as `urls`, desative o `udpDiscovery` definindo-o para `false`. Veja um exemplo:

```ts
transporter: {
  type: "TCP",
    options: {
      udpDiscovery: false,
      urls: [
        "172.17.0.1:6000/node-1",
        "172.17.0.2:6000/node-2",
        "172.17.0.3:6000/node-3"
      ],
    }
},
```

## Conclusão

Como vimos os Microservices são uma arquitetura de software, segundo o Martin Fowler. Essa arquitetura tem seus prós e contras mas certamente é interessante para algumas organizações. Com essa explanação e dinâmica focada na prática esperamos que você difunda o conhecimento que obteve aqui e, quem sabe, divulgue-o pela faculdade com seus colegas. Provavelmente você utilizará o Moleculer a partir de agora, não é mesmo? 😎

## Metadados

```
Muryllo Pimenta – muryllo.pimenta@upe.br
Lucas Henrique – lucas.henriquemonteiro@upe.br
```

Distribuído sobre a licença MIT. Veja ``LICENSE`` para mais informações.

## Contribuição

1. Fork it (<https://github.com/MurylloEx/Moleculer-Typescript-Boilerplate/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
