import { Provider } from 'react-redux';
import Body from './components/Body';
import appStore from './utils/appStore'; // Import your Redux store

function App() {
  return (
    <Provider store={appStore}>
      <Body />
    </Provider>
  );
}

export default App;
