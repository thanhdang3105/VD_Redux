import { Button, Col, Input, Row, Select, Tag } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { todoAction } from '../../redux/actions'
import Todo from '../Todo'
import { v4 as uuidV4 } from 'uuid'
import { todoListSelector } from '../../redux/selectors'

export default function TodoList() {
    
    const [todoName, setTodoName] = React.useState('')
    const [prioriry, setPriority] = React.useState('Medium')

    const todoList = useSelector(todoListSelector)

    const dispatch = useDispatch()

    const handleInputChange = (e) => {
        setTodoName(e.target.value)
    }

    const handleSelectChange = (value) => {
        setPriority(value)
    }

    const handleAddTodo = () => {
        const payload = {
            id: uuidV4(),
            name: todoName,
            prioriry: prioriry,
            completed: false
        }
        dispatch(todoAction('addTodo',payload))
        setTodoName('')
        setPriority('Medium')
    }
    
  return (
    <Row style={{ height: 'calc(100% - 40px)' }}>
        <Col span={24} style={{ height: 'calc(100% - 40px)', overflowY: 'auto' }}>
            {/* <Todo name='Learn React' prioriry='High' />
            <Todo name='Learn Redux' prioriry='Medium' />
            <Todo name='Learn JavaScript' prioriry='Low' /> */}
            {todoList.map(todo => {
                    return <Todo key={todo.id} id={todo.id} name={todo.name} prioriry={todo.prioriry} completed={todo.completed} />
            })}
        </Col>
        <Col span={24}>
            <Input.Group compact style={{ display: 'flex'}}>
                <Input value={todoName} onChange={handleInputChange}/>
                <Select defaultValue='Medium' value={prioriry} onChange={handleSelectChange}>
                    <Select.Option value='High' label='High'>
                        <Tag color='red'>High</Tag>
                    </Select.Option>
                    <Select.Option value='Medium' label='Medium'>
                        <Tag color='blue'>Medium</Tag>
                    </Select.Option>
                    <Select.Option value='Low' label='Low'>
                        <Tag color='gray'>Low</Tag>
                    </Select.Option>
                </Select>
                <Button type='primary' onClick={handleAddTodo}>Add</Button>
            </Input.Group>
        </Col>
    </Row>
  )
}
