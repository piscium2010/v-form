import React from 'react'
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
        v.expect('Required'),
        v.when('marriage', c => c.marriage === 'single').validate('marriage_date')
    ],
    marriage_date: v.when('marriage', c => c.marriage === 'married').expect('Required when married')
})

const style = { margin: 'auto', width: 380 }

export default class Form extends React.Component {
    state = { values: {} }

    update = value => {
        validation.test(value, this.state.values)
        const nextValues = { ...this.state.values, ...value }
        this.setState({ values: nextValues })
    }

    onSubmit = () => {
        validation.testAllRules(this.state.values)
        if (result.pass) {
            window.alert('pass')
        }
    }

    render() {
        
        return (
            <div style={style}>
                <p>Validation rules as:</p>
                <ul>
                    <li>Email is required with correct format</li>
                    <li>Marriage is required</li>
                    <li>Date of marriage is required only when married</li>
                </ul>
                <VForm validation={validation}>
                    <Field name='email'>
                        <Input
                            placeholder='Email'
                            style={style}
                            onChange={evt => this.update({ email: evt.target.value })}
                        />
                    </Field>
                    <Field name='marriage'>
                        <Select
                            placeholder='Marriage'
                            style={style}
                            onChange={value => this.update({ marriage: value })}
                        >
                            <Select.Option value="single">Single</Select.Option>
                            <Select.Option value="married">Married</Select.Option>
                        </Select>
                    </Field>
                    <Field name='marriage_date'>
                        <DatePicker
                            placeholder='Date of Marriage'
                            style={style}
                            onChange={(m, d) => this.update({ marriage_date: d })}
                        />
                    </Field>
                    <Button type="primary" onClick={this.onSubmit}>Submit</Button>
                </VForm>
            </div>
        )
    }
}

