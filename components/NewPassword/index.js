import React from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Auth } from "aws-amplify";

export default function NewPassword({ navigation, route }) {
  //const username = route;
  const { cognitoUser } = route.params;
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");

  const changePassword = React.useCallback(async password => {
    try {
      const loggedUser = await Auth.completeNewPassword(cognitoUser, password, {
        name: name
      });
      navigation.navigate("Main");
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <View>
      <TextInput
        label="name"
        value={name}
        onChangeText={name => setName(name)}
      />
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
