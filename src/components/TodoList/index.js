import { Button, Col, Input, Row, Select, Tag } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { todoAction } from '../../redux/actions'
import todoListSlice from './todoListSlice'
import Todo from '../Todo'
import { v4 as uuidV4 } from 'uuid'
import { todoRemainingSelector, todoEditSelector } from '../../redux/selectors'

export default function TodoList() {
    
    const [todoName, setTodoName] = React.useState('')
    const [priority, setPriorities] = React.useState('Medium')

    const todoList = useSelector(todoRemainingSelector)
    const todoEdit = useSelector(todoEditSelector)

    React.useEffect(() => {
        if(todoEdit && Object.entries(todoEdit).length){
            setTodoName(todoEdit.name)
            setPriorities(todoEdit.priority)
        }
        else{
            setTodoName('')
            setPriorities('Medium')    
        }
    }, [todoEdit])

    const dispatch = useDispatch()

    const handleInputChange = (e) => {
        setTodoName(e.target.value)
    }

    const handleSelectChange = (value) => {
        setPriorities(value)
    }

    const handleAddTodo = () => {
        if(todoName){
            const payload = {
                id: uuidV4(),
                name: todoName,
                priority: priority,
                completed: false
            }
            dispatch(todoListSlice.actions.addTodo(payload))
            setTodoName('')
            setPriorities('Medium')
        }
    }

    const handleUpdateTodo = () => {
        if(todoName){
            const payload = {
                id: todoEdit.id,
                name: todoName,
                priority: priority,
                completed: todoEdit.completed
            }
            dispatch(todoListSlice.actions.updateTodo(payload))
            setTodoName('')
            setPriorities('Medium')
        }
    }
    
  return (
    <Row style={{ flex: '1', overflow: 'hidden' }}>
        <Col span={24} className="todoList">
            {todoList && todoList.map(todo => {
                    return <Todo key={todo.id} id={todo.id} name={todo.name} priority={todo.priority} completed={todo.completed} 
                    edit={todoEdit && Object.entries(todoEdit).length && todoEdit.id === todo.id ? true : false} />
            })}
        </Col>
        <Col span={24}>
            <Input.Group compact style={{ display: 'flex'}}>
                <Input value={todoName} onChange={handleInputChange} onPressEnter={handleAddTodo}/>
                <Select defaultValue='Medium' value={priority} onChange={handleSelectChange}>
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
                {todoEdit && Object.entries(todoEdit).length ? (<Button type='primary' onClick={handleUpdateTodo}>Update</Button>)
                : (<Button type='primary' onClick={handleAddTodo}>Add</Button>)}
                
            </Input.Group>
        </Col>
    </Row>
  )
}
