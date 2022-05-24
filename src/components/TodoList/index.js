import { Button, Col, Input, Row, Select, Tag } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { todoAction } from '../../redux/actions'
import Todo from '../Todo'
import { v4 as uuidV4 } from 'uuid'
import { todoListSelector, todoEditSelector } from '../../redux/selectors'

export default function TodoList() {
    
    const [todoName, setTodoName] = React.useState('')
    const [prioriry, setPriority] = React.useState('Medium')

    const todoList = useSelector(todoListSelector)
    const todoEdit = useSelector(todoEditSelector)

    React.useEffect(() => {
        if(Object.entries(todoEdit).length){
            setTodoName(todoEdit.name)
            setPriority(todoEdit.prioriry)
        }
        else{
            setTodoName('')
            setPriority('Medium')    
        }
    }, [todoEdit])

    const dispatch = useDispatch()

    const handleInputChange = (e) => {
        setTodoName(e.target.value)
    }

    const handleSelectChange = (value) => {
        setPriority(value)
    }

    const handleAddTodo = () => {
        if(todoName){
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
    }

    const handleUpdateTodo = () => {
        if(todoName){
            const payload = {
                id: todoEdit.id,
                name: todoName,
                prioriry: prioriry,
                completed: todoEdit.completed
            }
            dispatch(todoAction('updateTodo',payload))
            setTodoName('')
            setPriority('Medium')
        }
    }
    
  return (
    <Row style={{ flex: '1', overflow: 'hidden' }}>
        <Col span={24} className="todoList">
            {todoList.map(todo => {
                    return <Todo key={todo.id} id={todo.id} name={todo.name} prioriry={todo.prioriry} completed={todo.completed} 
                    edit={Object.entries(todoEdit).length && todoEdit.id === todo.id ? true : false} />
            })}
        </Col>
        <Col span={24}>
            <Input.Group compact style={{ display: 'flex'}}>
                <Input value={todoName} onChange={handleInputChange} onPressEnter={handleAddTodo}/>
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
                {Object.entries(todoEdit).length ? (<Button type='primary' onClick={handleUpdateTodo}>Update</Button>)
                : (<Button type='primary' onClick={handleAddTodo}>Add</Button>)}
                
            </Input.Group>
        </Col>
    </Row>
  )
}
