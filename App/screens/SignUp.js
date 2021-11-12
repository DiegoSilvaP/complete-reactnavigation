import React from 'react';
import { Button } from 'react-native';

import { AuthContext } from "../config/context";

export default () => {
    const { signUp } = React.useContext(AuthContext);
    return (
  <>
    <Button title="Sign Up" onPress={() => signUp()} />
  </>
);}