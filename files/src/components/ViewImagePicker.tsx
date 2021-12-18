import { Pressable, Text, Actionsheet } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons'
import React from 'react';
import { View, TouchableOpacity, ViewStyle, StyleSheet } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import Colors from '../constants/colors';
import _ from 'lodash';

import colors from '../constants/colors';
const optionsImagePicker = {
    title: 'Select Picture',

    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

export interface Error {
    type: string
    msg: string
}
interface file {
    name: string
    type: string,
    size: number,
    lastModified?: number
    uri: string
    webkitRelativePath?: string
}
export type IWrappedUploadImageProps = {
    accept?: string
    maxSize?: string,
    onErrorValidate?(error: Error): void
    onChangeFile?(file: file): void
    children?: React.ReactNode
    style?: ViewStyle | ViewStyle[]
}

type ImagePickerType = 'capture' | 'library'
interface Action {
    title: string;
    type: 'capture' | 'library';
    options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
}

const actions: Action[] = [
    {
        title: 'Take Image',
        type: 'capture',
        options: {
            saveToPhotos: true,
            mediaType: 'photo',
            includeBase64: false,
        },
    },
    {
        title: 'Select Image',
        type: 'library',
        options: {
            maxHeight: 200,
            maxWidth: 200,
            selectionLimit: 0,
            mediaType: 'photo',
            includeBase64: false,
        },
    },
    {
        title: 'Take Video',
        type: 'capture',
        options: {
            saveToPhotos: true,
            mediaType: 'video',
        },
    },
    {
        title: 'Select Video',
        type: 'library',
        options: {
            selectionLimit: 0,
            mediaType: 'video',
        },
    },
    {
        title: `Select Image or Video\n(mixed)`,
        type: 'library',
        options: {
            selectionLimit: 0,
            mediaType: 'mixed',
        },
    },
];

export const OptionsImagePicker = {
    'library': {
        label: "Select profile picture",
        iconName: "ios-image-outline"
    },
    'capture':
    {
        label: "Take new profile picture",
        iconName: "ios-camera-outline"
    }

}


const ViewImagePicker: React.FC<IWrappedUploadImageProps> = (props) => {
    const [response, setResponse] = React.useState<any>(null);
    const [imagePickerType, setImagePickerType] = React.useState(null);
    const [showPicker, setShowPicker] = React.useState(false);

    const [showModal, setShowModal] = React.useState(false);
    const close = () => setShowModal(false);
    const open = () => setShowModal(true);

    const onButtonPress = React.useCallback((type, options) => {
        if (type === 'capture') {
            ImagePicker.launchCamera(options, handleResponse);
        } else {
            ImagePicker.launchImageLibrary(options, handleResponse);
        }
    }, []);



    const handleResponse = (res) => {
        try {
            const { assets } = res
            // console.log("source", assets)
            if (_.isArray(assets) && assets.length > 0) {
                const firstAssets = assets[0]
                let source = { uri: firstAssets.uri, fileName: firstAssets.fileName, name: firstAssets.fileName, type: 'image/jpg', size: firstAssets.fileSize, };
                console.log("source", firstAssets)
                if (props.onChangeFile) {
                    props.onChangeFile(source)
                }
            }
        } catch (error) {
            console.log("error", error)
        }

    }

    return (
        <>
            <Pressable style={[props.style, { position: "relative" }]} onPress={open} >
                {props.children}
                <Pressable
                    onPress={open}
                    position="absolute"
                    bottom={1}
                    right={2}
                    borderWidth={StyleSheet.hairlineWidth}
                    borderColor={"#bbb"}
                    borderRadius={50}
                    backgroundColor={"#24222212"}
                >


                    <Icon name="camera" style={{ fontSize: 25, color: "#fff"}} />
                </Pressable>

            </Pressable>

            <Actionsheet isOpen={showModal} onClose={close}>
                <Actionsheet.Content>
                    {Object.keys(OptionsImagePicker).map((key, index) => {
                        return (
                            <Actionsheet.Item key={index}
                                startIcon={
                                    <Icon name={OptionsImagePicker[key].iconName} style={{ fontSize: 25 }} />
                                }
                                onPress={() => {
                                    onButtonPress(key, {
                                        // selectionLimit: 0,
                                        saveToPhotos: true,
                                        mediaType: 'photo',
                                        includeBase64: false,
                                    })
                                    setShowModal(false)

                                }}
                            >
                                {OptionsImagePicker[key].label}
                            </Actionsheet.Item>
                        )
                    })}

                </Actionsheet.Content>
            </Actionsheet>
        </>
    );
}
export default ViewImagePicker;
export { ViewImagePicker };
