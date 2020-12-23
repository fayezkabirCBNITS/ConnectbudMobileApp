import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
//import RootStackNavigator from './src/navigators/RootStackNavigator';
import AppContainer from './src/navigators/Navigator';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
// import Toast from "react-native-toast-message";
// import Loader from "./src/containers/Loader";
// const AppContainer = createAppContainer(RootStackNavigator);
export default class App extends Component {
  appContainerRef = null;

  onNavigationStateChange = (prevState, newState, action) => {
    // console.log(
    //   "prevState, newState, action :>> ",
    //   prevState,
    //   newState,
    //   action
    // );
  };
  render() {
    // console.log = () => {};
    return (
      <>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <AppContainer
              onNavigationStateChange={(prevState, newState, action) =>
                this.onNavigationStateChange(prevState, newState, action)
              }
            />
            {/* <Loader /> */}
          </PersistGate>
        </Provider>

        {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
      </>
    );
  }
}
