import './App.css';
import { Typography, Divider } from 'antd'
import Filter from './components/Filter';
import TodoList from './components/TodoList';

const { Title } = Typography

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Title>TODO APP with REDUX</Title>
      </header>
      <Filter/>
      <Divider/>
      <TodoList/>
    </div>
  );
}

export default App;
