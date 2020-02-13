import React from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Auth } from "aws-amplify";

export default function NewPassword({ route }) {
  //const username = route;
  const { cognitoUser } = route.params;
  const [password, setPassword] = React.useState("");

  const changePassword = React.useCallback(async password => {
    try {
      console.log(route);
      const loggedUser = await Auth.completeNewPassword(cognitoUser, password, {
        name: "Rainer"
      });

      console.log(loggedUser);
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <View>
      <TextInput
        label="password"
        secureTextEntry={true}
        value={password}
        onChangeText={password => setPassword(password)}
      />
      <Button icon="key" onPress={() => changePassword(password)}>
        Update Password
      </Button>
    </View>
  );
}
