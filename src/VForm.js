import React from 'react'
import { MessageContainer, connectToMessageContainer } from 'react-input-message'
import Field from './Field'
import v from './v'

export default class VForm extends React.Component {
    static defaultProps = {
        validation: v.create({}) // validation with empty rules
    }

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

    constructor(props) {
        super(props)
        this.state = {
            messages: props.defaultMessages || {}
        }
        this.validation = props.validation
    }

    get messages() {
        return 'messages' in this.props ? this.props.messages : this.state.messages
    }

    onMessages = messages => {
        const newMessages = { ...this.state.messages, ...messages }
        this.setState({ messages: newMessages })
    }

    subscribe = () => {
        const { validation } = this.props
        const { has, addListener } = validation
        if (has && addListener) {
            if (!validation.has(this)) {
                this.unSubscribe() // first unsubscribe previous
                this.validation = validation
                this.validation.addListener(this, this.onMessages)
            }
        } else {
            throw 'invalid valition passed to VForm'
        }
    }

    unSubscribe = () => {
        this.validation.removeListener(this)
    }

    componentDidUpdate() {
        this.subscribe()
    }

    componentDidMount() {
        this.subscribe()
    }

    componentWillUnmount() {
        this.unSubscribe()
    }

    render() {
        return (
            <MessageContainer messages={this.messages}>{this.props.children}</MessageContainer>
        )
    }
}