import React from 'react';
import { Button } from 'react-native';

import { AuthContext } from "../config/context";

export default () => {
    const { signOut } = React.useContext(AuthContext);
    return (
  <>
    <Button title="Sign Out" onPress={() => signOut()} />
  </>
);}