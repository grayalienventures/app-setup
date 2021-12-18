import React, { PureComponent } from 'react'
import * as _ from 'lodash'
import { Platform, TouchableOpacity, View, Pressable, StyleSheet, TouchableOpacityProps, ViewStyle, StyleProp, Animated, TextStyle, TouchableNativeFeedback, } from 'react-native'
import { Spinner, Text, Toast } from 'native-base'

import { showMessage, hideMessage } from "react-native-flash-message";

import useMountedState from '../../utils/useMountedState'
// import Animated from 'react-native-reanimated'


const defulatOptionsToast: OptionsToastT = {
    position: "center",
    duration: 30000,
    swipeDisabled: false,
    buttonText: "Okay",
    onClose: (reason: "user" | "timeout" | "functionCall") => {
        // console.warn(reason)
    }
}

interface OptionsToastT {
    position?: "top" | "bottom" | "center" | any;
    buttonText?: string;
    duration?: number;
    style?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
    buttonTextStyle?: StyleProp<TextStyle>
    buttonStyle?: StyleProp<ViewStyle>
    swipeDisabled?: boolean;
    onClose?: (reason: "user" | "timeout" | "functionCall") => any;
}


const SIZE = 7
const MARGIN = 5
const BG = 'rgb(172, 172, 172)'
const ACTIVE_BG = '#808184'
const dots = [1, 2, 3]
const INTERVAL = 300
const ANIMATION_DURATION = 400
const ANIMATION_SCALE = 1.4

const StyleButtonDefault = {
    // margin: 0,
    flexDirection: "row",
    // padding: 6,
    // borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    backgroundColor: "#4B3C67",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    // height: 45,
    // elevation: 2,
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 1.2

    // alignItems: 'center',
    // justifyContent: 'space-between'
    // height: 50,
    // flexGrow: 1
    // borderRadius: 50,
    // width: "100%0",
}
const StyleFull = {
    justifyContent: 'center',
    alignSelf: 'stretch',
    borderRadius: 0
}
const colors = {
    red: "#cc0000",
    green: "#198c19",
    light: "#f4f4f4",
    blue: "#1919ff",
}

const omitProps = [
    'children',
    "processingComponent",
    'customButton',
    'customButtonProps',
    "timeShowMsg",
    "clearResult",
    "variant",
    "onPress",
    "styleMessage",
    'styleText',
    'optionsToast',
    'noShowResultMessageSuccess',
    'noShowResultMessageError',

    // Event listeners
    "onPress",
    "onPressFetching",
];
export interface IButtonLoadingProps extends TouchableOpacityProps {
    onPress?(): void
    onPressFetching?: () => Promise<string>
    processingComponent?: React.ReactNode
    timeShowMsg?: number
    clearResult?: boolean
    customButton?: any
    customButtonProps?: any
    // full?: boolean
    variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'dark'
    | 'light'
    | 'link'
    | 'transparent';
    styleMessage?: StyleProp<ViewStyle>
    children?: React.ReactNode | string
    styleText?: StyleProp<TextStyle>
    optionsToast?: OptionsToastT
    noShowResultMessageSuccess?: boolean
    noShowResultMessageError?: boolean
}


const ButtonLoading: React.FC<IButtonLoadingProps> = (props) => {

    const [loading, setLoading] = React.useState(false);
    const [show, setShow] = React.useState(false);
    const [msg, setMsg] = React.useState('');
    const [isSuccessMsg, setIsSuccessMsg] = React.useState(false);
    const [asyncState, setAsyncState] = React.useState(null);
    const willMount = React.useRef(true);
    const [currentClearResult, setCurrentClearResult] = React.useState(false);
    const [textDots, setTextDots] = React.useState(".");
    const isMounted = useMountedState();
    // const [scale, setScale] = React.useState(defaultState);




    React.useEffect(() => {
        return (() => {
            if (willMount.current) {
                willMount.current = false
            }
        })
    }, [])

    React.useEffect(() => {
        if (props.clearResult != currentClearResult && props.clearResult == true) {
            clearResult()
        }
        setCurrentClearResult(props.clearResult)
    }, [props.clearResult])

    const showMsg = (msg: string = "", success: boolean = false) => {
        setLoading(false)
        setIsSuccessMsg(success)
        setShow(true);
        setMsg(msg);

        if (props.clearResult && props.clearResult == true) {
            setTimeout(() => {
                clearResult()
            }, props.timeShowMsg);
        }

    }


    const clearResult = () => {
        setIsSuccessMsg(false)
        setShow(false);
        setMsg('');
    }


    /**
        * 
        * @param e 
        */
    const onPress = () => {


        if (props.onPress) {
            return props.onPress()
        }


        if (props.onPressFetching) {
            clearResult()
            setLoading(true)
            props.onPressFetching().then((res) => {
                // if (!willMount || !willMount.current) {
                //     return;
                // }
                console.log("!willMount", willMount)
                console.log("isMounted", isMounted())
                if (!isMounted()) {
                    return
                }
                setLoading(false)
                if (!props.noShowResultMessageSuccess) {
                    showMessage({
                        message: `${res}`,
                        type: "success",
                        duration: Number(props.optionsToast.duration),
                        icon: "success"
                        // hideStatusBar:true,
                    })
                }


            }).catch((error) => {
                const msgError = _.has(error, "message") ? `${error.message}` : `${error}`
                if (!willMount || !willMount.current) {
                    return;
                }
                setLoading(false)
                if (!props.noShowResultMessageError) {
                    showMessage({
                        message: "" + msgError,
                        type: "danger",
                        icon: "danger",
                        duration: Number(props.optionsToast.duration)
                    })
                }

            })
        }
    }

    const getVariant = (variant, style) => {

        const variantList = {
            "default": StyleButtonDefault,
            "success": [StyleButtonDefault, styles.success],
            "danger": [StyleButtonDefault, styles.danger],
            "primary": [StyleButtonDefault, styles.primary],
            "transparent": styles.transparent
        }
        if (variantList[variant]) {
            return [variantList[variant], style]
        }
        return []
    }
    const setStyle = () => {

    }
    //let defualtStyle = props.full ?
    let style = props.variant ? getVariant(props.variant, props.style) : []





    const renderChildern = () => {
        if (_.isString(props.children)) {
            return (<Text style={[styles.styleText, props.styleText]}>{props.children}</Text>)

        }
        return props.children
    }



    const renderContantButton = () => {
        return (
            <>

                <View style={{ flexDirection: "row" }}>
                    {(loading && props.processingComponent) ?
                        props.processingComponent
                        : renderChildern()}

                </View>
            </>
        )
    }


    let Button = Pressable
    let customButtonProps = {}

    if (props.customButton) {
        Button = props.customButton
        customButtonProps = props.customButtonProps || {}
    }

    const renderButton = (): JSX.Element => {
        return (
            <Button
                {..._.omit(props, omitProps)}
                {...customButtonProps}
                disabled={loading || props.disabled}
                style={[style, props.style]}
                onPress={onPress}>
                {renderContantButton()}
            </Button>
        )
    }


    const renderWithMessage = () => {
        return (
            <View style={{ flex: 1, flexDirection: "column" }}
            //  onPress={onPress}
            >
                <View style={{ flex: 1 }}>
                    <View style={[styles.styleMessage, props.styleMessage]}>
                        <Text style={{ color: isSuccessMsg ? colors.green : colors.red }} >{msg}</Text>
                    </View>
                </View>
                <Button
                    {..._.omit(props, omitProps)}
                    {...customButtonProps}
                    disabled={loading || props.disabled}
                    style={[style, props.style]}
                    onPress={onPress}
                >
                    {renderContantButton()}
                </Button>
            </View>
        )
    }

    if (show) {
        return renderWithMessage()
    }

    return renderButton()


}


const styles = StyleSheet.create({

    light: {

        // borderRadius: 50,
        // backgroundColor: colors.light,
        // elevation: 1,
        // shadowColor: "#000",
        // shadowOpacity: 0.1,
        // shadowOffset: { width: 2, height: 2 },
        // shadowRadius: 1.0,
        // marginVertical: 1,
    },
    success: {
        backgroundColor: colors.green,
        color: "#fff",
    },
    danger: {
        backgroundColor: colors.red,
        color: "#fff",
    },
    primary: {
        backgroundColor: colors.blue,
        color: "#fff",
    },
    transparent: {
        backgroundColor: null
    },
    styleMessage: {
        flex: 1,
        backgroundColor: '#fff', // read
        // backgroundColor: '#rgba(162, 90, 83, 0.5)', // read
        // backgroundColor: 'rgba(255, 255, 255, 0.5)',
        opacity: 0.7,
        padding: 5,
        alignContent: 'center',
        justifyContent: 'center', alignItems: 'center'
    },
    styleText: {
        textAlign: 'center'
    }

})
const defaultProps = {


    // variant: "primary"
}

const DefaultPendingCompnenet = (
    <View style={{
        flexDirection: "row",
        height: 35,
        justifyContent: "center",
        alignContent: "center", alignItems: "center"
    }}>
        <Spinner />
    </View>
)


ButtonLoading.defaultProps = {
    disabled: false,
    clearResult: true,
    timeShowMsg: 2000,
    // pendingComponent: (DefaultPendingCompnenet),
    optionsToast: defulatOptionsToast
};
export default ButtonLoading;
export { ButtonLoading }