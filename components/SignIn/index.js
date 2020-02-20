import React from "react";
import { TextInput, Button, Snackbar } from "react-native-paper";
import { View, Text } from "react-native";
import { Auth } from "aws-amplify";
import storeContext from "../../storeContext";

export default function SignIn({ navigation }) {
  const context = React.useContext(storeContext);
  const [user, setUser] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const SignInUser = React.useCallback(async (username, password) => {
    try {
      const userResponse = await Auth.signIn(username, password);

      if (userResponse.challengeName === "NEW_PASSWORD_REQUIRED") {
        navigation.nativate("NewPassword", {
          cognitoUser: userResponse
        });
      } else {
        context.dispatch({ type: "login" });
        navigation.navigate("Main");
      }
    } catch (err) {
      console.log(err);
      setMessage(err.message);
      setVisible(err.message);
    }
  });

  return (
    <View>
      <TextInput
        label="email"
        value={user}
        onChangeText={user => setUser(user)}
      />
      <TextInput
        secureTextEntry={true}
        label="password"
        value={password}
        onChangeText={password => setPassword(password)}
      />
      <Button icon="account" onPress={() => SignInUser(user, password)}>
        SignIn
      </Button>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{
          label: "Dismiss",
          onPress: () => {
            setVisible(false);
          }
        }}
      >
        {message}
      </Snackbar>
    </View>
  );
}
