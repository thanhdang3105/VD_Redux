import { Checkbox, Row, Tag } from 'antd';
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

return (
  <Row justify='space-between' style={{ marginBottom: '3px',...(checked ? { opacity: 0.5, textDecoration: 'line-through' } : {})}}>
      <Checkbox checked={checked} onChange={handleCheckTodo}>
          {name}
      </Checkbox>
      <Tag color={priorityColorMapping[prioriry]}>{prioriry}</Tag>
  </Row>
)
})
