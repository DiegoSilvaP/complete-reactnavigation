import React from 'react';
import { Button } from 'react-native';

import { AuthContext } from "../config/context";

export default ({ navigation }) => {
    const { signIn } = React.useContext(AuthContext);
    return (
  <>
    <Button title="Sign In" onPress={() => signIn()} />
    <Button title="Sign Up" onPress={() => navigation.push('SignUp')} />
  </>
);}