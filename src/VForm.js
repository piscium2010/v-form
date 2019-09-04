import React from 'react'
import { MessageContainer, connectToMessageContainer } from './lib/react-input-message'
import Field from './Field'

export default class VForm extends React.Component {
    static fieldFactory = C => {
        const CustomField = connectToMessageContainer(Field(C), {
            mapMessages: (
                messages,
                names,
                props,
                container
            ) => {
                const one = messages[props.name]
                const message = [].concat(one)[0]
                return message || ''
            }
        })
        return CustomField
    }

    render() {
        const { messages, children } = this.props
        return (<MessageContainer messages={messages}>{children}</MessageContainer>)
    }
}