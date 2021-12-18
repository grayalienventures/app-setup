import React from 'react';
import { ITextProps, Text as TextNB } from 'native-base';
import Colors from '../colors';

interface ITexNtProps extends ITextProps {

}

const Text: React.FC<ITexNtProps> = (props) => {
    return (
        <TextNB
            _light={{
                color: Colors.titleCard,
            }}
            _dark={{
                color: '#fff'
            }}
            {...props}
        />
    );
}
export default Text
export { Text }