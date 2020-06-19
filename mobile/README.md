<img src="https://s3.us-east-2.amazonaws.com/gobarber-img/logo.svg" height = "150"/>

Este projeto foi iniciado com [React Native init](https://facebook.github.io/react-native/docs/getting-started).

---

## :open_book: Páginas:

#### :unlock: Cadastro:

![Cadastro](https://github.com/yagolopes/gobarber/tree/master/mobile/blob/master/.github/create-account.gif)

#### :unlock: Login:

![Login](https://github.com/yagolopes/gobarber/tree/master/mobile/blob/master/.github/login.gif)

#### :closed_lock_with_key: Meu perfil:

![Meu-perfil](https://github.com/yagolopes/gobarber/tree/master/mobile/blob/master/.github/my-profile.png)

#### :closed_lock_with_key: Agendar Horário:

![dashboard](https://github.com/yagolopes/gobarber/tree/master/mobile/blob/master/.github/appointments.gif)

---

## :hammer: Configuração:

Antes de começar, garanta que a [API](https://github.com/yagolopes/gobarber/tree/master/backend) esteja configurada e em funcionamento.

Com o terminal aberto na raiz do projeto mobile usar `yarn install` para instalar todas as dependências/libs.

Após isso, digite no terminal `react-native link` para instalar dependências nativas do Android e IOS.

### :green_apple: Configurar IOS:

O primeiro passo é instalar o [CocoaPods](https://cocoapods.org/) e para isso basta executar `sudo gem install cocoapods`.

Após isso, entre na pasta ios usando `cd ios` e execute `pod install` para instalar as dependências necessárias relacionados a esta plataforma.

Feito isso, para rodar o simulador do Iphone é necessário instalar o kit de desenvolvedor da Apple, o [Xcode](https://developer.apple.com/xcode/) e ele pode ser baixado [aqui](https://apps.apple.com/br/app/xcode/id497799835?mt=12).

Com isso, basta executar `react-native run-ios` para abrir o simulador com o aplicativo injetado nele.

### :robot: Configurar Android:

Antes de tudo é necessário instalar um simulador de android. De vários disponíveis, recomendados o uso do [Genymotion](https://www.genymotion.com/desktop/) para computadores mais fracos ou o [Android Studio](https://developer.android.com/studio) para computadores mais potentes.

Com isso, basta executar `react-native run-android` para abrir o simulador com o aplicativo injetado nele.

### Ferramenta para Debug

Você pode usar o [Reactotron](https://github.com/infinitered/reactotron/releases) para facilitar a depuração do aplicativo web e também do mobile.

![REACTOTRON](https://github.com/yagolopes/gobarber/tree/master/mobile/blob/master/.github/reactotron.png)

---

## :rocket: APP GOBARBER

- Api criado no bootcamp da Rocketseat

![Bootcamp](https://rocketseat.com.br/static/images/update/bootcamp.svg)

### [GoBarber API](https://github.com/yagolopes/gobarber/tree/master/backend)

### [GoBarber WEB](https://github.com/yagolopes/gobarber/tree/master/frontend)

### [GoBarber MOBILE](https://github.com/yagolopes/gobarber/tree/master/mobile)
