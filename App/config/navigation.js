import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ContactsList from '../screens/ContactsList';
import ContactDetails from '../screens/ContactDetails';
import ActionsList from '../screens/ActionsList';
import ActionDetails from '../screens/ActionDetails';
import Settings from '../screens/Settings'
import SignIn from '../screens/SignIn'
import SignUp from '../screens/SignUp'
import Profile from '../screens/Profile'
import Loading from '../screens/Loading'
import { AuthContext } from "./context";

const ContactsStack = createStackNavigator();
const ContactsStackScreen = () => (
  <ContactsStack.Navigator
        // screenOptions={{
        //     headerStyle: {backgroundColor: "red"}
        // }}
    >
    <ContactsStack.Screen name="ContactsList" component={ContactsList} options={{
        headerTitle: "Contacts"
    }}/>
    <ContactsStack.Screen name="ContactDetails" component={ContactDetails} options={({ route }) => {
        return {
            headerTitle: `${route.params.contact.name.first} ${route.params.contact.name.last}`,
            // headerStyle: {backgroundColor: "green"}
        }
    }} />
  </ContactsStack.Navigator>
);

const ActionsStack = createStackNavigator();
const ActionsStackScreen = () => (
    <ActionsStack.Navigator    >
        <ActionsStack.Screen name='ActionsList' component={ActionsList} />
        <ActionsStack.Screen name='ActionDetails' component={ActionDetails} />
    </ActionsStack.Navigator>
)


const AppTabs = createBottomTabNavigator();
const AppTabsScreen = () => (
    <AppTabs.Navigator
    // tabBarOptions= {{
    //     activeTintColor: 'red',
    //     activeBackgroundColor: 'blue'
    // }}
    >
        <AppTabs.Screen name="Contacts" component={ContactsStackScreen} options={{
            tabBarIcon: (props) => <Ionicons name="ios-people" size={props.size} color={props.color}/>
        }}/>
        <AppTabs.Screen name="Actions" component={ActionsStackScreen} options={{
            tabBarIcon: (props) => <Ionicons name="checkmark-circle-outline" size={props.size} color={props.color}/>
        }}/>
    </AppTabs.Navigator>
)


const AppDrawer = createDrawerNavigator();
const AppDrawerScreen = () => (
    <AppDrawer.Navigator 
        drawerType="back"
        // drawerPosition="right"
        >
        <AppDrawer.Screen name="Tabs" component={AppTabsScreen} options={{
            drawerLabel: "Home"
        }}/>
        <AppDrawer.Screen name="Settings" component={Settings} options={{
            gestureEnabled: false
        }}/>
        <AppDrawer.Screen name="Profile" component={Profile} options={{
            gestureEnabled: false
        }}/>
    </AppDrawer.Navigator>
)

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
    <AuthStack.Navigator>
        <AuthStack.Screen name='SignIn' component={SignIn} />
        <AuthStack.Screen name='SignUp' component={SignUp} />
    </AuthStack.Navigator>
)

const RootStack = createStackNavigator();
const RootStackScreen = ({ userToken }) => (
    <RootStack.Navigator headerMode='none'>
        {userToken ? (
            <RootStack.Screen name='App' component={AppDrawerScreen} />
        ) : (
            <RootStack.Screen name='Auth' component={AuthStackScreen} />
        )}
    </RootStack.Navigator>
)

export default () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [userToken, setUserToken] = React.useState(null);

    const authContext = React.useMemo(() => {
        return {
          signIn: () => {
            setIsLoading(false);
            setUserToken("asdf");
          },
          signUp: () => {
            setIsLoading(false);
            setUserToken("asdf");
          },
          signOut: () => {
            setIsLoading(false);
            setUserToken(null);
          }
        };
      }, []);

    React.useEffect(() => {
        setTimeout(() =>{
            setIsLoading(!isLoading);
        }, 1000);

        // if (isLoading) {
        //     return <Loading />;
        //   }
    }, []);

    return(
        <AuthContext.Provider value={authContext} >

            <NavigationContainer>
            {isLoading ? <Loading /> : <RootStackScreen userToken={userToken} />}
                
            </NavigationContainer>
        </AuthContext.Provider>
    );
}