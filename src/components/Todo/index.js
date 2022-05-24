import { Checkbox, Row, Tag } from 'antd';
import { CloseCircleOutlined, EditOutlined, CloseOutlined } from '@ant-design/icons'
import React from 'react'
import { useDispatch } from 'react-redux';
import todoListSlice from '../TodoList/todoListSlice';

const priorityColorMapping = {
    High: 'red',
    Medium: 'blue',
    Low: 'gray',
  };

export default React.memo(function Todo({ id, name, priority, completed, edit }) {

  const [checked, setChecked] = React.useState(completed)

  const dispatch = useDispatch()

  const handleCheckTodo = () => {
    setChecked(!checked);
    dispatch(todoListSlice.actions.toggleCompleted(id))
  }

  const handleEditTodo =() => {
    dispatch(todoListSlice.actions.editTodo(id))
  }
  const handleCloseEditTodo =() => {
    dispatch(todoListSlice.actions.editTodo(''))
  }

  const handleDeleteTodo =() => {
    dispatch(todoListSlice.actions.deleteTodo(id)) 
  }


return (
  <Row className='toDoItem' style={{ marginBottom: '3px',alignItems:"center",...(checked ? { opacity: 0.5, textDecoration: 'line-through' } : {})}}>
      <Checkbox checked={checked} onChange={handleCheckTodo} style={{flex: 1}}>
          {name}
      </Checkbox>
      <Tag className={`todoControl ${edit && 'show'}`}color='transparent'>
        {edit ? <CloseOutlined className='iconEditTodo' onClick={handleCloseEditTodo} /> : <EditOutlined className='iconEditTodo' onClick={handleEditTodo} />}
        <CloseCircleOutlined className='iconDeleteTodo' onClick={handleDeleteTodo} />
      </Tag>
      <Tag style={{width: '60.16px', textAlign: 'center'}} color={priorityColorMapping[priority]}>{priority}</Tag>
  </Row>
)
})
