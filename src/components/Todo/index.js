import { Button, Checkbox, Row, Tag } from 'antd';
import { CloseCircleOutlined, EditOutlined } from '@ant-design/icons'
import React from 'react'
import { useDispatch } from 'react-redux';
import { todoAction } from '../../redux/actions'

const priorityColorMapping = {
    High: 'red',
    Medium: 'blue',
    Low: 'gray',
  };

export default React.memo(function Todo({ id, name, prioriry, completed }) {

  const [checked, setChecked] = React.useState(completed)

  const dispatch = useDispatch()

  const handleCheckTodo = () => {
    setChecked(!checked);
    dispatch(todoAction('toggleCompleted', id))
  }

  const handleEditTodo =() => {
    dispatch(todoAction('editTodo', id))
  }

  const handleDeleteTodo =() => {
    dispatch(todoAction('deleteTodo', id)) 
  }


return (
  <Row className='toDoItem' style={{ marginBottom: '3px',alignItems:"center",...(checked ? { opacity: 0.5, textDecoration: 'line-through' } : {})}}>
      <Checkbox checked={checked} onChange={handleCheckTodo} style={{flex: 1}}>
          {name}
      </Checkbox>
      <Tag className='todoControl' color='transparent'>
        <EditOutlined className='iconEditTodo' onClick={handleEditTodo} />
        <CloseCircleOutlined className='iconDeleteTodo' onClick={handleDeleteTodo} />
      </Tag>
      <Tag style={{width: '60.16px', textAlign: 'center'}} color={priorityColorMapping[prioriry]}>{prioriry}</Tag>
  </Row>
)
})
