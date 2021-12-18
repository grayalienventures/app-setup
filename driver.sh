#! /bin/bash

CUR_DIR=$(pwd)
CURRENT_USER=$(whoami)

echo -e "\n"
echo ----------------------------------------
echo ------ REACT NATIVE APP GENERATOR ------ 
echo -------------- BY INTP LLC -------------
echo ----------------------------------------
echo -e "\n"

# echo Path of directory where scaffolded project is to be located:
# read -e PROJECT_DIR

echo Name of project:
read -e PROJECT_NAME

if  [[  $PROJECT_NAME =~  [^\$a-z\_][0-9A-Z\_\$]  ]]; then
   echo "\"$PROJECT_NAME\" is not a valid name for a project. Please use a valid identifier name (alphanumeric)"
   exit 
fi


PROJECT_DIR="$CUR_DIR/$PROJECT_NAME"
ASSETS_ANDROID="$PROJECT_DIR/android/app/src/main/assets"

cd $CUR_DIR
# yarn global add @react-native-community/cli
# npx react-native init $PROJECT_NAME
install_react_native(){
  react-native init $PROJECT_NAME --template react-native-template-typescript
    
  if [  -f "$PROJECT_DIR./package.json" ];
    then
        echo "Please try again"
        exit
  fi 

  
  cd $PROJECT_DIR
}

get_platform()
{
    if [ "$(uname)" == "Darwin" ]; then
        echo "OS"
    elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
        echo "Linux"
    elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW32_NT" ]; then
        echo "MINGW32_NT"
    elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW64_NT" ]; then
       echo "MINGW64_NT"
    fi
}

    
install_dependencies(){
    yarn config set ignore-engines true
    yarn add --force react-native@^0.66.3
    yarn add --force -D typescript @types/jest @types/react @types/react-native @types/react-test-renderer babel-plugin-module-resolver jetifier prettier  --force
    yarn add --force @react-native-community/async-storage@^1.12.1
    yarn add --force native-base@^3.1.0 react-native-svg@^12.1.1 react-native-vector-icons@^8.1.0 react-native-flash-message@^0.1.23 react-native-image-picker@^4.4.0
    yarn add --force react-native-gesture-handler@^2.0.0 react-native-reanimated@^2.2.4 @react-native-community/masked-view@^0.1.11 react-native-screens@^3.0.0 @react-navigation/bottom-tabs@^5.11.9 @react-navigation/compat@^5.3.15 @react-navigation/drawer@^5.12.5 @react-navigation/native@^5.9.4  @react-navigation/stack@^5.14.4 react-native-animatable@^1.3.3  react-native-safe-area-context@^3.0.0 react-navigation@^4.4.4 react-navigation-drawer@^2.7.1 react-navigation-stack@^2.10.4 
    yarn add --force @react-native-community/viewpager@^5.0.11  immer use-immer wpapi react-redux redux redux-persist redux-thunk axios lodash moment validator
}


config_init_project(){
    cp -r $CUR_DIR/files/src "$PROJECT_DIR/src"  
    if [ ! -d "$ASSETS_ANDROID" ];
  	then
      mkdir $ASSETS_ANDROID
    fi
    cp -r $CUR_DIR/files/fonts "$ASSETS_ANDROID/fonts"

    cp $CUR_DIR/files/index.js "$PROJECT_DIR/index.js"
    cp $CUR_DIR/files/index.ios.js "$PROJECT_DIR/index.ios.js"
    cp $CUR_DIR/files/index.ios.js "$PROJECT_DIR/index.ios.js"
    cp $CUR_DIR/files/tsconfig.json "$PROJECT_DIR/tsconfig.json"

    cp $CUR_DIR/files/jest.config.js "$PROJECT_DIR/jest.config.js"
    cp $CUR_DIR/files/.gitignore "$PROJECT_DIR/.gitignore"
    cp $CUR_DIR/files/.prettierrc.js "$PROJECT_DIR/.prettierrc.js"
    cp $CUR_DIR/files/rn-cli.config.js "$PROJECT_DIR/rn-cli.config.js"
    cp $CUR_DIR/files/tslint.json "$PROJECT_DIR/tslint.json"
    cp $CUR_DIR/files/.flowconfig "$PROJECT_DIR/.flowconfig"
  

}
 # fix issues 
 # https://github.com/software-mansion/react-native-reanimated/issues/846
config_reanimated(){
    KEY_WORD_HERMES="enableHermes: false,"
    
    sed -i -e "s/enableHermes: false,/enableHermes: true,/" $PROJECT_DIR/android/app/build.gradle
    cp $CUR_DIR/files/MainApplication.java $PROJECT_DIR/android/app/src/main/java/com/${PROJECT_NAME}/MainApplication.java
    sed -i -e "s/here_package_name/${PROJECT_NAME}/" $PROJECT_DIR/android/app/src/main/java/com/${PROJECT_NAME}/MainApplication.java
    cp $CUR_DIR/files/babel.config.js "$PROJECT_DIR/babel.config.js"
}



# config_android
config_android(){
    PLATFORM=$(get_platform)   
    SDKDIR=""
    if [[ ! -z "$PLATFORM"="MINGW32_NT" || "$PLATFORM" = "MINGW64_NT" ]];
    then
        CURRENT_USER="\\$CURRENT_USER"
        SDKDIR='C\\:\\''\\Users\\''\\'"${CURRENT_USER}"'\\''\\AppData\\''\\Local\\''\\Android\\''\\Sdk'
    else    
        SDKDIR="\/Users\/${CURRENT_USER}\/Library\/Android\/sdk"
    fi
    cp $CUR_DIR/files/local.properties $PROJECT_DIR/android/local.properties
    
    sed -i -e "s/sdkdir_here/"$SDKDIR"/" $PROJECT_DIR/android/local.properties
}



#instructions
instructions(){
  echo -e "------------------------ Instructions ------------------------"
  echo -e 'Run instructions for iOS: 
                  • cd '"$PROJECT_DIR"' && npx react-native run-ios
                  - or -
                  • Open '"$PROJECT_NAME"'\ios\'"$PROJECT_NAME"'.xcodeproj in Xcode or run "xed -b ios"
                  • Hit the Run button'
  echo -e 'Run instructions for Android:
              • Have an Android emulator running (quickest way to get started), or a device connected.
              • cd '"$PROJECT_DIR"' && npx react-native run-android'
}


install_react_native
install_dependencies
config_init_project
config_reanimated
config_android
instructions
