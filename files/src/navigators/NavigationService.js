
import * as React from 'react';
export const navigationRef = React.createRef();

let _navigator;
function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

export function navigate(name, params) {
    navigationRef.current?.navigate(name, params);
}

export default {
    navigate,
    setTopLevelNavigator,
};