
import { Provider } from 'react-redux';
import NotesApp from './components/NotesApp';
import { store } from './store/store';


function App() {
  return (
    <Provider store={store}>
      <NotesApp />
    </Provider>
  );
}

export default App;