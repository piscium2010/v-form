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
    textField: { width: 300 },
    select: { width: 300 }
}))

const Field = VForm.fieldFactory(({ name, message, children }) => {
    const { Children, cloneElement } = React
    const hasError = message ? true : false
    return (
        <div style={{ marginBottom: 10 }}>
            {Children.map(children, element => cloneElement(element, { error: hasError }))}
            <div style={{ color: '#f44336', fontSize: 12 }}>{message}</div>
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
    const [messages, setMessages] = useState({})
    const [values, setValues] = useState({ email: '', marriage: '', birth_date: new Date() })

    const update = value => {
        const result = validation.test(value, values)
        setMessages({ ...messages, ...result.messages })
        setValues({ ...values, ...value })
    }

    const onSubmit = () => {
        const result = validation.testAllRules(values)
        setMessages({ ...messages, ...result.messages })
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
                <VForm messages={messages}>
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
                            format="MM/dd/yyyy"
                            value={values.birth_date}
                            onChange={d => update({ birth_date: d })}
                        />
                    </Field>
                    <Button variant="contained" color="primary" className={classes.button} onClick={onSubmit}>Submit</Button>
                </VForm>
            </div>
        </MuiPickersUtilsProvider>
    )
}

