# v-form
This is not a form, instead it is only a form shell of which the single responsibility is validating and providing error messages. Capable of definding flexiable rules and validating multi fields at a time.

<div align="center">
<img width="600px" src="https://upload-images.jianshu.io/upload_images/11189734-0118629c411dd98f.gif?imageMogr2/auto-orient/strip"/>
</div>

## Install

```js
npm i -S v-form
```

## Use

v-form is a shell, so it works well with any UI libraries like antd, office fabric and material ui. Please find following examples.

More about validation [v-rule](https://github.com/piscium2010/v-rule)

### Ant Design

```jsx
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
        const { values } = this.state
        validation.test(value, values /* context */)
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
```

[live demo](https://codepen.io/piscium/full/OJLxxzp)

### Office Fabric

```jsx
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
```

[live demo](https://codepen.io/piscium/full/rNBGpVW)

### Material UI
```jsx
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import VForm, { v } from 'v-form'

const useStyles = makeStyles(theme => ({
    textField: { width: 300, marginBottom: 5 },
    select: { width: 300, marginBottom: 5 },
    picker: { width: 300, marginBottom: 5 }
}))

const Field = VForm.fieldFactory(({ name, message, children }) => {
    const { Children, cloneElement } = React
    const hasError = message ? true : false
    const errorStyle = { color: '#f44336', fontSize: 12, marginBottom: 15 }
    return (
        <div>
            {Children.map(children, c => cloneElement(c, { error: hasError }))}
            <div style={errorStyle}>{message}</div>
        </div>
    )
})

const validation = v.create({
    email: v.expect('Required').expect('Should be email', c => v.isEmail(c.email)),
    marriage: v.expect('Required'),
    birth_date: v.expect('Required')
        .expect(
            'Seriouly? Just born?',
            c => c.birth_date.getFullYear() < new Date().getFullYear()
        )
})

export default function Form() {
    const [values, setValues] = useState({ email: '', marriage: '', birth_date: new Date() })

    const update = value => {
        validation.test(value, values/* context */)
        setValues({ ...values, ...value })
    }

    const onSubmit = () => {
        const result = validation.testAllRules(values)
        if (result.pass) {
            window.alert('pass')
        }
    }

    const classes = useStyles();
    const style = { margin: 'auto', width: 380 }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div style={style}>
                <p>Validation rules as:</p>
                <ul>
                    <li>Email is required with correct format</li>
                    <li>Marriage is required</li>
                    <li>Birth date year can not be current year</li>
                </ul>
                <VForm validation={validation}>
                    <InputLabel>Email</InputLabel>
                    <Field name='email'>
                        <TextField
                            className={classes.textField}
                            onChange={evt => update({ email: evt.target.value })}
                        />
                    </Field>
                    <InputLabel>Marriage</InputLabel>
                    <Field name='marriage'>
                        <Select
                            className={classes.select}
                            value={values.marriage}
                            onChange={evt => update({ marriage: evt.target.value })}
                        >
                            <MenuItem value={'single'}>Single</MenuItem>
                            <MenuItem value={'married'}>Married</MenuItem>
                        </Select>
                    </Field>
                    <InputLabel>Birth Date</InputLabel>
                    <Field name='birth_date'>
                        <KeyboardDatePicker
                        className={classes.picker}
                            format="MM/dd/yyyy"
                            value={values.birth_date}
                            onChange={d => update({ birth_date: d })}
                        />
                    </Field>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={onSubmit}
                    >
                        Submit
                    </Button>
                </VForm>
            </div>
        </MuiPickersUtilsProvider>
    )
}
```
[live demo](https://codepen.io/piscium/full/mdbBpBo)