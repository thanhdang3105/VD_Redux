import { Col, Input, Radio, Row, Select, Tag, Typography } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { filterAction } from '../../redux/actions'

export default React.memo(function Filter() {
    const [searchInputValue,setSearchInputValue] = React.useState('')
    const [radioStatus,setRadioStatus] = React.useState('All')
    const [selectPrioriry,setSelectPriority] = React.useState([])

    const dispatch = useDispatch()

    const handleSearchInputChange = (e) => {
        setSearchInputValue(e.target.value)
        dispatch(filterAction('filterText',e.target.value))
    }

    const handleRadioStatusChange = (e) => {
        setRadioStatus(e.target.value)
        dispatch(filterAction('filterStatus',e.target.value))
    }

    const handleSelectPrioriryChange = (value) => {
        setSelectPriority(value)
        dispatch(filterAction('filterPrioriry',value))
    }

    const handleClearAllSelect = () => {
        setSelectPriority('')
        dispatch(filterAction('filterPrioriry',''))
    }

  return (
    <Row justify='center'>
        <Col span={24}>
            <Typography.Paragraph style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}>
                Search
            </Typography.Paragraph>
            <Input placeholder='Input search text...' allowClear value={searchInputValue} onChange={handleSearchInputChange}/>
        </Col>
        <Col span={24}>
            <Typography.Paragraph style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}>
                Filter By Status
            </Typography.Paragraph>
            <Radio.Group value={radioStatus} onChange={handleRadioStatusChange}>
                <Radio value="All">All</Radio>
                <Radio value="Completed">Completed</Radio>
                <Radio value="Todo">Todo</Radio>
            </Radio.Group>
        </Col>
        <Col span={24}>
            <Typography.Paragraph style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}>
                Filter By Priority
            </Typography.Paragraph>
            <Select mode='multiple' allowClear placeholder='Please select' value={selectPrioriry} style={{ width: '100%'}} onClear={handleClearAllSelect} onChange={handleSelectPrioriryChange}>
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
        </Col>
    </Row>
  )
})
