import React, { PureComponent } from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { View, Pressable, Spinner } from 'native-base';
import Icon from '../../components/Icon'
import { ButtonLoading } from '../../components/ButtonLoading';
import { uploadFileServer } from '../../utils/RequestMethods';
import ViewImagePicker from '../../components/ViewImagePicker';
import images from '../../constants/images';
import { resolveImageUrl } from '../../utils';
import colors from '../../constants/colors';
const options = {
    title: 'Select Picture',

    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};


export type IProfilePictureProps = {
    profilePic?: any
    save(params): Promise<string>
}

const ProfilePicture: React.FC<IProfilePictureProps> = (props) => {
    const [statusResult, setStatusResult] = React.useState({
        loading: false,
        msg: "",
        show: false,
        colorStatus: colors.red,
    });
    const [profilePic, setProfilePic] = React.useState(images.defaultUser);

    const [dirtyImageSource, setDirtyImageSource] = React.useState(null)
    React.useEffect(() => {

        if (props.profilePic && props.profilePic != "") {
            setProfilePic(resolveImageUrl(props.profilePic))
        }
    }, [props.profilePic]);


    /**
     * 
     */
    const initFetch = () => {
        setStatusResult((draft) => {
            draft.loading = true;
            return draft
        })
    }


    /**
     * 
     * @returns 
     */
    const saveProfilePicture = async (): Promise<string> => {
        try {
            const res = await uploadFileServer(dirtyImageSource)
            if (res.source_url) {

                let params = {
                    profilePic: res.source_url
                }

                setProfilePic(res.source_url)
                const resSave = await props.save(params)
                if (resSave) {
                    setTimeout(() => {
                        setDirtyImageSource(null)
                    }, 1000);
                    return "Profile Picture saved successfully."
                }
            }
        } catch (error) {
            throw error
        }
    }


    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={{ borderRadius: 50, borderColor: '#eee', borderWidth: 1, width: 150, height: 150, marginTop: 10 }} >
                    <ViewImagePicker style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                        onChangeFile={(file) => {
                            setDirtyImageSource(file)
                        }}>
                        {dirtyImageSource
                            ? <Image
                                borderRadius={20}
                                style={currentStyles.ImageProfile}
                                source={dirtyImageSource != null ? dirtyImageSource : images.camera}
                            />
                            : <Image borderRadius={20} style={currentStyles.ImageProfile} source={{ uri: `${profilePic}` }} />
                        }
                    </ViewImagePicker>

                </TouchableOpacity>

            </View>
            {dirtyImageSource && <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", padding: 5 }}>
                <ButtonLoading
                    onPress={() => {
                        setDirtyImageSource(null)
                    }}>
                    <Icon name="ios-close" style={{ fontSize: 25, color: colors.red }} />
                </ButtonLoading>
                <ButtonLoading
                    processingComponent={(<View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Spinner size="sm" />
                    </View>)}
                    onPressFetching={saveProfilePicture} >
                    <Icon name="ios-checkmark" style={{ fontSize: 25, color: colors.green }} />
                </ButtonLoading>
            </View>}
        </View>

    )

}

export { ProfilePicture };


const currentStyles = StyleSheet.create({
    ImageProfile: {
        width: 150, height: 150
    },

})