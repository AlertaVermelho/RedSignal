# 🌍 Red Signal - Sistema de Alertas Ambientais

O Red Signal é um aplicativo mobile desenvolvido para Android e iOS que tem como objetivo prevenir e mitigar desastres naturais por meio de alertas geolocalizados e monitoramento de áreas críticas. A aplicação foi desenvolvida com foco em usabilidade e acesso rápido à informação em situações de risco, permitindo que qualquer cidadão possa tanto receber quanto registrar alertas relevantes à sua localização atual.

Funcionalidades principais:

📍 Mapa com Hotspots e Alertas: A Home do app exibe um mapa interativo contendo pontos de calor (hotspots) e alertas gerados por IA ou de forma manual. Os ícones e cores representam a severidade e tipo do evento.

🚨 Criação de Alertas: O usuário pode criar um novo alerta com descrição textual, localização atual e timestamp, que é enviado automaticamente à base de dados.

💖 Locais Favoritos: Permite salvar locais específicos com nome personalizado. Ideal para acompanhar áreas como casa de familiares, escola, empresa, etc.

📜 Histórico de Alertas: Armazena os alertas criados pelo próprio usuário com informações de data, descrição e local.

🔔 Notificações de proximidade: Quando hotspots forem registrados próximos da localização atual ou de um local favorito, o usuário será notificado.

## 🎥 Vídeo de Demonstração

🔗 [Clique aqui para assistir à apresentação do app](https://www.youtube.com/watch?v=SEU_LINK_AQUI)

## 👥Desenvolvedores

- RM559177 - Amanda Mesquita Cirino da Silva
- RM555698 - Beatriz Ferreira Cruz
- RM556071 - Journey Tiago Lopes Ferreira

## 🧩 Tecnologias Utilizadas

- **React Native**
- **Expo**
- **TailwindCSS (NativeWind)**
- **AsyncStorage**
- **React Navigation**
- **Expo Location**
- **API Java Spring Boot** (Hotspots e Alertas)
- **API C# .NET** (Locais Favoritos)
- **Expo Go (para testes em dispositivos reais)**

---

## ⚙️ Como Rodar o Projeto

### 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/red-signal-app.git
cd red-signal-app
```

### 2. Instalar as Dependências

```bash
npm install
```

### 3. Criar o Arquivo `.env`

Crie um arquivo `.env` na raiz do projeto e configure os seguintes campos seguindo o env example:

```env
API_JAVA_URL=https://active-opaline-redalert-cdce0187.koyeb.app/
```

### 4. Executar o Projeto

```bash
npx expo start
```

Depois, escaneie o QR Code com o aplicativo Expo Go em seu dispositivo físico **(recomendado)** ou execute em um emulador Android/iOS.

---

## 📱 Observações Importantes

### Emulador Android

Para que o app funcione corretamente em emuladores, é necessário configurar uma **localização simulada**:

1. Abra as configurações do seu emulador.
2. Vá em **Location > Set Location Manually**.
3. Informe uma latitude e longitude válidas (por exemplo, `-23.5505, -46.6333` para São Paulo).

Sem isso, o app pode não carregar o mapa ou os alertas corretamente.

### Dispositivo Real

- No dispositivo real, o app solicita permissão de localização automaticamente.
- A localização atual é utilizada para:
  - Mostrar a posição do usuário no mapa.
  - Criar novos alertas.
  - Salvar locais favoritos.
  - Calcular proximidade com hotspots.

---

## 📌 Funcionalidades

- [x] Exibição de hotspots em tempo real.
- [x] Criação de novos alertas com geolocalização.
- [x] Armazenamento e gerenciamento de locais favoritos.
- [x] Modal para nomear o local salvo (funciona em iOS e Android).
- [x] Notificações de risco com base na proximidade de hotspots.
- [x] Navegação via tabs: Home, Criar Alerta, Favoritos, Histórico.

---
