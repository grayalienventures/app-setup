import React, { PureComponent } from 'react'
import * as _ from 'lodash'
import PropTypes from 'prop-types'
import { View, StyleSheet, Image, ScrollView, KeyboardAvoidingView, TextInputProps } from 'react-native'
import { Text, Input, Stack, FormControl } from 'native-base';
import config from '../../constants/config';
import { useImmer } from 'use-immer';

export const isEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export const validatePassword = (value) => {
    const re = /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/i;
    return re.test(value);
}


const initState = {
    showError: false,
    error: '',
    text: "",
    isError: true,
    isListViewVisible: "auto",
}

const omitProps = [
    "required",
    "value",
    'placeholder',
    'type',
    'validated',
    "secureTextEntry",
    'isInvalid',
    'autoValidated',
    // Event listeners
    "onChangeText",
    'customValidation',
    'onBlur',

];
export interface Error {
    isError: boolean
    messageError?: string
}
export interface IInputValidationProps extends TextInputProps {
    value?: string
    required?: boolean
    placeholder?: string
    type?: "text" | "phone" | "email" | "password"
    validated?: boolean
    onChangeText?(text: any): void
    customValidation?(text): Error
    onBlur?(): void
    secureTextEntry?: boolean
    InputRightElement?: JSX.Element | JSX.Element[];
    variant?: 'outline' | 'filled' | 'underlined' | 'unstyled' | 'rounded'
    customInput?: any
    customInputProps?: any
    isInvalid?: boolean
    helperText?: string
    autoValidated?: boolean
    disabled?: boolean
}

const InputValidation: React.FC<IInputValidationProps> = (props) => {
    const [state, setState] = useImmer(initState);
    const [isWritten, setIsWritten] = React.useState(false);

    const [validated, setValidated] = React.useState(false);
    React.useEffect(() => {
        setState((draft) => {
            draft.text = props.value

        })
        isValidation(props.value)
    }, [props.value]);

    React.useEffect(() => {

        isValidation(props.value)

        if (!props.autoValidated) {
            setValidated(props.validated)
        }
    }, [props.validated]);


    React.useEffect(() => {
        setState((draft) => {
            draft.text = props.value

        })
        isValidation(props.value)
    }, [props.value]);


    const isError = () => {
        if (!props.required) return false;
        if (state.isError) {

            return true;
        }
        return false;
    }


    const getName = () => {
        return props.placeholder;
    }

    const onChangeText = (text) => {
        if (props.type == "phone") {
            text = removeText(text)
        }
        isValidation(text)
        setState((draft) => {
            draft.text = text

        })
        if (props.onChangeText) {
            props.onChangeText(text)
        }


    }

    const isValidation = (text: String) => {
        if (!props.required) return false;

        let showError = false;
        let error = "";

        /** 
        * customValidation
        * @param text
        * @return object {error:"",:msg:""}
        */
        if (props.customValidation) {
            let check = props.customValidation(text);
            if (check.isError) {
                showError = true;
                error = check.messageError;
            }

            setState((draft) => {
                draft.showError = showError
                draft.error = error
                draft.isError = showError

            })
            return false;
        }


        if (props.type == "email") {
            if (!isEmail(text)) {
                showError = true;
                error = "Invalid email addres";
            }
        }

        if (props.type == "password") {

            if (text.length < 8) {
                showError = true
                error = "Your password must be at least 8 characters long."
            }
        }
        if (props.type == "phone") {
            if ((text.length >= 10 && text.length < 14) == false) {
                showError = true;
                error = "Invalid Phone";
            }
        }

        if (!text) {
            showError = true;
            error = "Required";

        }

        setState((draft) => {
            draft.showError = showError
            draft.error = error
            draft.isError = showError
            return draft
        })


    }

    /**
     * 
     */
    const removeText = (str) => {
        return str.split(/ /)[0].replace(/[^\d]/g, '')
    }

    const onBlur = () => {
        if (props.onBlur) {
            props.onBlur()
        }
        if (props.autoValidated) {
            setValidated(true)
        }
        isValidation(state.text)
    }

    const showError = (status, msg) => {

        setState((draft) => {
            draft.showError = status
            draft.error = msg
            draft.isError = status
            return draft
        })
    }


    let InputInstance = Input
    let customTextInputProps = {}

    if (props.customInput) {
        InputInstance = props.customInput

    }
    customTextInputProps = props.customInputProps || {}


    const renderContant = () => {
        return (
            <FormControl isInvalid={props.isInvalid != null || (state.showError && validated)}>
                <InputInstance

                    {..._.omit(props, omitProps)}
                    {...customTextInputProps}
                    value={state.text}
                    style={styles.InputText}
                    placeholder={props.placeholder}
                    onChangeText={(text) => onChangeText(text)}

                    onBlur={() => onBlur()}
                    secureTextEntry={props.secureTextEntry}
                    InputRightElement={props.InputRightElement}
                />

                <FormControl.ErrorMessage >
                    {props.helperText != null ? props.helperText : state.error}
                </FormControl.ErrorMessage>
            </FormControl>
        )
    }


    return (
        <View>
            {renderContant()}
        </View>

    )

}

InputValidation.defaultProps = {
    required: false,
    placeholderTextColor: "rgba(0, 0, 0, 0.42);",
    placeholder: "",
    type: "text"

}

export { InputValidation };
const styles = StyleSheet.create({
    flag: {
        height: 20,
        width: 30,

        borderRadius: 2,
        borderWidth: 0.5,
        borderColor: '#cecece',
        backgroundColor: '#cecece',
    },
    InputText: {
        paddingLeft: 1,
        paddingRight: 1,
        // color: "#000",
        // fontSize: 16.5,
    },
    InputError: {
        marginRight: 5,
        color: '#F44336',
        fontSize: 14
    },

    InputErrorAutocomplete: {
        marginRight: 5,
        marginTop: 20,
        color: '#F44336',
        fontSize: 14
    }
})

export default InputValidation