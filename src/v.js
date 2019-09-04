import vrule from 'v-rule'

function create(ruleStore) {
    const validation = vrule.create(ruleStore)
    const forms = new Map() // listeners
    const { test, testAllRules } = validation
    const notify = function (result) {
        const messages = result.messages
        window.setTimeout(() => {
            forms.forEach(onMessages => {
                onMessages(messages)
            })
        }, 100)
    }

    validation.addListener = function (instance, onMessages) {
        forms.set(instance, onMessages)
    }
    validation.removeListener = function (instance) {
        forms.delete(instance)
    }

    validation.test = function (values, context) {
        const result = test(values, context)
        notify(result)
        return result
    }

    validation.testAllRules = function (values, context) {
        const result = testAllRules(values, context)
        notify(result)
        return result
    }

    validation.has = function (instance) {
        return forms.has(instance)
    }

    return validation
}

const v = Object.assign({}, vrule, { create })
export default v