# StockRecommender

A cross-platform React Native app for stock recommendations, using real or mock data, with a maintainable and testable architecture.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [Yarn](https://yarnpkg.com/) or npm
- [Watchman](https://facebook.github.io/watchman/) (macOS)
- [Xcode](https://developer.apple.com/xcode/) (for iOS)
- [Android Studio](https://developer.android.com/studio) (for Android)
- [CocoaPods](https://cocoapods.org/) (for iOS)
- Ruby (for CocoaPods)

> **Tip:** Complete the [React Native Environment Setup](https://reactnative.dev/docs/environment-setup) before proceeding.

---

### 1. Install Dependencies

```sh
# Install JS dependencies
npm install
# or
yarn install

# (iOS only) Install native dependencies
bundle install
bundle exec pod install --project-directory=ios
```

---

### 2. Configure Environment Variables

To use real stock data, create a `.env` file in the project root:

```
ALPHA_VANTAGE_API_KEY=YOUR_ALPHA_VANTAGE_API_KEY
```

- Get a free API key from [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
- If no key is set, the app will use mock data for development

---

### 3. Start the Metro Bundler

```sh
npm start
# or
yarn start
```

---

### 4. Run the App

#### Android
```sh
npm run android
# or
yarn android
```

#### iOS
```sh
npm run ios
# or
yarn ios
```

> **Note:** For iOS, ensure you have run CocoaPods as shown above.

---

## 🏗️ Project Structure

```
src/
├── algorithms/         # Recommendation algorithms
├── api/                # Data fetching and mock services
├── components/         # Reusable UI components
├── constants/          # App-wide config and labels
├── hooks/              # Custom React hooks
├── screens/            # App screens
├── services/           # Service factories and utilities
├── types/              # TypeScript types
```

- **Mock vs Real Data:**
  - If `ALPHA_VANTAGE_API_KEY` is set, real stock data is fetched
  - If not, the app uses mock data for all stocks (great for development/testing)

---

## 🧪 Running Tests

```sh
npm test
# or
yarn test
```

- Tests are written with Jest and @testing-library/react-native
- Business logic is separated into hooks and services for easy testing

---

## ⚙️ Configuration & Customization
- Change default time window, price volatility, and more in `src/constants/config.ts`
- Add new algorithms in `src/algorithms/` and register them in `src/algorithms/index.ts`
- Accessibility labels and error messages are centralized in `src/constants/config.ts`

---

## 📝 Troubleshooting
- See the [React Native Troubleshooting Guide](https://reactnative.dev/docs/troubleshooting)
- If you change `.env`, restart Metro (`npm start`)
- For iOS, always run `bundle exec pod install` after changing native dependencies

---

## 📚 Learn More
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Alpha Vantage API](https://www.alphavantage.co/documentation/)
- [StockTwits API](https://api.stocktwits.com/developers/docs/api)

---

## 🙌 Contributing
Pull requests and issues are welcome! Please follow best practices and keep business logic separated from UI for maintainability.
