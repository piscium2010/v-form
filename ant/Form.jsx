import React from 'react'
// import Button from 'antd/lib/button'
// import 'antd/lib/button/style/css'
// import Select from 'antd/lib/select'
// import 'antd/lib/select/style/css'
// import Input from 'antd/lib/input'
// import 'antd/lib/input/style/css'
// import DatePicker from 'antd/lib/date-picker'
// import 'antd/lib/date-picker/style/css'
import { Button, Select, Input, DatePicker } from 'antd'
import VForm, { v } from 'v-form'

const Field = VForm.fieldFactory(({ name, message, children }) => {
    return (
        <div className={message ? 'has-error' : ''} style={{ marginBottom: 15 }}>
            {children}
            <div className='error-msg'>{message}</div>
        </div>
    )
})

const validation = v.create({
    email: v.expect('Required').expect('Should be email', c => v.isEmail(c.email)),
    marriage: [
        v.expect('Required').expect('Should be single or married', c => ['single', 'married'].includes(c.marriage)),
        v.when('marriage', c => c.marriage === 'single').validate('marriage_date')
    ],
    marriage_date: v.when('marriage', c => c.marriage === 'married').expect('Required when married')
})

export default class Form extends React.Component {
    state = {
        values: {},
        messages: {}
    }

    updateForm = value => {
        const result = validation.test(value, this.state.values)
        const messages = { ...this.state.messages, ...result.messages }
        const values = { ...this.state.values, ...value }
        this.setState({ values, messages })
    }

    onSubmit = () => {
        const result = validation.testAllRules(this.state.values)
        const messages = { ...this.state.messages, ...result.messages }
        this.setState({ messages })
        if (result.pass) {
            window.alert('pass')
        }
    }

    render() {
        const style = { margin: 'auto', width: 380 }
        const { messages } = this.state
        return (
            <div style={style}>
                <p>Validation rules as:</p>
                <ul>
                    <li>Email is required with correct format</li>
                    <li>Marriage is required</li>
                    <li>Date of marriage is required only when married</li>
                </ul>
                <VForm messages={messages}>
                    <Field name='email'>
                        <Input placeholder='Email' style={style} onChange={evt => this.updateForm({ email: evt.target.value })} />
                    </Field>
                    <Field name='marriage'>
                        <Select placeholder='Marriage' style={style} onChange={value => this.updateForm({ marriage: value })}>
                            <Select.Option value="single">Single</Select.Option>
                            <Select.Option value="married">Married</Select.Option>
                        </Select>
                    </Field>
                    <Field name='marriage_date'>
                        <DatePicker placeholder='Date of Marriage' style={style} onChange={(m, d) => this.updateForm({ marriage_date: d })} />
                    </Field>
                    <Button type="primary" onClick={this.onSubmit}>Submit</Button>
                </VForm>
            </div>
        )
    }
}

