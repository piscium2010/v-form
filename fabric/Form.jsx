import React from 'react'
import { PrimaryButton, DatePicker, DayOfWeek, TextField, Dropdown } from 'office-ui-fabric-react'
import { initializeIcons } from '@uifabric/icons'
import VForm, { v } from 'v-form'

initializeIcons()

const options = [
    { key: 'single', text: 'Single' },
    { key: 'married', text: 'Married' }
]

const Field = VForm.fieldFactory(({ name, message, children }) => {
    const { Children, cloneElement } = React
    return (
        <div>
            {Children.map(children, c => cloneElement(c, { errorMessage: message }))}
        </div>
    )
})

const DateField = VForm.fieldFactory(({ name, message, children }) => {
    const errorStyle = { paddingTop: 5, color: '#A4262c', fontSize: 12, fontFamily: `"Segoe UI"` }

    //add class here to change input border color to red when message !== ''
    return (
        <div>
            {children}
            <div style={errorStyle}>{message}</div>
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

export default class Form extends React.Component {
    state = { values: {} }

    update = value => {
        const { values } = this.state
        validation.test(value, values/* context */)
        this.setState({ values: { ...values, ...value } })
    }

    onSubmit = () => {
        const { values } = this.state
        const result = validation.testAllRules(values)
        if (result.pass) {
            window.alert('pass')
        }
    }

    render() {
        return (
            <div style={{ width: 400, margin: 'auto' }}>
                <p>Validation rules as:</p>
                <ul>
                    <li>Email is required with correct format</li>
                    <li>Marriage is required</li>
                    <li>Date of marriage is required only when married</li>
                </ul>
                <VForm validation={validation}>
                    <Field name='email'>
                        <TextField
                            label="Email"
                            onChange={(evt, value) => this.update({ email: value })}
                        />
                    </Field>
                    <Field name='marriage'>
                        <Dropdown
                            label="Marriage"
                            options={options}
                            onChange={(evt, option) => this.update({ marriage: option.key })}
                        />
                    </Field>
                    <DateField name='marriage_date'>
                        <DatePicker
                            value={this.state.values.marriage_date}
                            label="Date of Marriage"
                            firstDayOfWeek={DayOfWeek.firstDayOfWeek}
                            onSelectDate={d => this.update({ marriage_date: d })}
                        />
                    </DateField>
                    <PrimaryButton text='Submit' onClick={this.onSubmit} />
                </VForm>
            </div>
        )
    }
}