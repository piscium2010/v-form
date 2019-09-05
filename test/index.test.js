import React, { useState } from 'react'
import { render, fireEvent } from '@testing-library/react'
import VForm, { v } from '../dist'

const Field = VForm.fieldFactory(({ name, message, children }) => {
    return (
        <section>
            {children}
            <div>{message}</div>
        </section>
    )
})

const validation = v.create({
    email: v.expect('email is required').expect('Should be email', c => v.isEmail(c.email)),
    marriage: [
        v.expect('marriage is required').expect('Should be single or married', c => ['single', 'married'].includes(c.marriage)),
        v.when('marriage', c => c.marriage === 'single').validate('marriage_date')
    ],
    marriage_date: v.when('marriage', c => c.marriage === 'married').expect('Required when married')
})

function Form(props) {
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
    }

    return (
        <div>
            <VForm messages={messages}>
                <Field name='email'>
                    <label htmlFor="email">email</label>
                    <input id="email" onChange={evt => update({ email: evt.target.value })} />
                </Field>

                <Field name='marriage'>
                    <label htmlFor="marriage">marriage</label>
                    <input id="marriage" onChange={evt => update({ marriage: evt.target.value })} />
                </Field>
                <Field name='marriage_date'>
                    <label htmlFor="marriage_date">marriage_date</label>
                    <input id='marriage_date' onChange={evt => update({ marriage_date: evt.target.value })} />
                </Field>
                <button onClick={onSubmit}>Submit</button>
            </VForm>
        </div>
    )
}

function FormII(props) {
    const [values, setValues] = useState({ email: '', marriage: '', birth_date: new Date() })

    const update = value => {
        validation.test(value, values)
        setValues({ ...values, ...value })
    }

    const onSubmit = () => {
        validation.testAllRules(values)
    }

    return (
        <div>
            <VForm validation={validation} {...props}>
                <Field name='email'>
                    <label htmlFor="email">email</label>
                    <input id="email" onChange={evt => update({ email: evt.target.value })} />
                </Field>

                <Field name='marriage'>
                    <label htmlFor="marriage">marriage</label>
                    <input id="marriage" onChange={evt => update({ marriage: evt.target.value })} />
                </Field>
                <Field name='marriage_date'>
                    <label htmlFor="marriage_date">marriage_date</label>
                    <input id='marriage_date' onChange={evt => update({ marriage_date: evt.target.value })} />
                </Field>
                <button onClick={onSubmit}>Submit</button>
            </VForm>
        </div>
    )
}

test('basic', () => {
    const { queryByText, getByText } = render(<Form />)
    fireEvent.click(getByText(/submit/i))
    expect(queryByText('email is required')).toBeTruthy()
    expect(queryByText('marriage is required')).toBeTruthy()
    expect(queryByText('Required when married')).toBeNull()
})

test('Should be email', () => {
    const { queryByText, getByText, getByLabelText } = render(<Form />)
    fireEvent.change(getByLabelText(/email/i), { target: { value: '2' } })
    expect(queryByText('Should be email')).toBeTruthy()
    fireEvent.change(getByLabelText(/email/i), { target: { value: '2@2.com' } })
    expect(queryByText('Should be email')).toBeNull()
})

test('Should be single or married', () => {
    const { queryByText, getByText, getByLabelText } = render(<Form />)
    fireEvent.change(getByLabelText('marriage'), { target: { value: '2' } })
    expect(queryByText('Should be single or married')).toBeTruthy()
    fireEvent.change(getByLabelText('marriage'), { target: { value: 'single' } })
    expect(queryByText('Should be single or married')).toBeNull()
})

test('Required when married', () => {
    const { queryByText, getByText, getByLabelText } = render(<Form />)
    fireEvent.change(getByLabelText('marriage'), { target: { value: 'married' } })
    fireEvent.click(getByText(/submit/i))
    expect(queryByText('Required when married')).toBeTruthy()
    fireEvent.change(getByLabelText('marriage'), { target: { value: 'single' } })
    expect(queryByText('Required when married')).toBeNull()
})

test('default messages', () => {
    const { queryByText, getByText, getByLabelText } = render(
        <FormII defaultMessages={{ email: 'abcd' }} />
    )
    expect(queryByText(/abcd/i)).toBeTruthy()
    fireEvent.click(getByText(/submit/i))
    expect(queryByText('email is required')).toBeNull()
})

test('messages', () => {
    const { queryByText, getByText, getByLabelText } = render(
        <FormII messages={{ email: 'abcd' }} />
    )
    expect(queryByText(/abcd/i)).toBeTruthy()
    fireEvent.click(getByText(/submit/i))
    expect(queryByText(/abcd/i)).toBeTruthy()
})