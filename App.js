import { Provider } from 'react-redux';
import StackNavigation from './src/navigation/StackNavigation';
import { store } from './src/redux/store';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <Provider store={store}>
      <StackNavigation />
      <Toast />
    </Provider>
  )
}

export default App;