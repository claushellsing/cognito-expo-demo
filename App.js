import React from "react";
import { StyleSheet } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import LoginContext from "./storeContext";

import SignIn from "./components/SignIn";
import NewPassword from "./components/NewPassword";
import Home from "./components/Home";

Amplify.configure(awsconfig);
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

Amplify.Auth.currentSession()
  .then(data => console.log(data))
  .catch(err => console.log(err));

const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        login: true
      };
      break;
  }
  return state;
};

const initialState = {
  login: false
};

function Main() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { login } = state;

  return (
    <PaperProvider>
      <NavigationContainer>
        <LoginContext.Provider value={{ state, dispatch }}>
          <Stack.Navigator initialRouteName={login ? "Main" : "SignIn"}>
            {!login && (
              <React.Fragment>
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen
                  name="NewPassword"
                  component={NewPassword}
                  options={{ title: "Input New Password" }}
                />
              </React.Fragment>
            )}
            <Stack.Screen name="Main" component={Main} />
          </Stack.Navigator>
        </LoginContext.Provider>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
