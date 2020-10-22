import React from "react";
import {Auth, Hub} from 'aws-amplify';
import {Authenticator, AmplifyTheme} from 'aws-amplify-react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import BlogPage from "./pages/BlogPage";
import PostPage from "./pages/PostPage";
import "./App.css";

export const UserContext = React.createContext()

class App extends React.Component {
    state = {
        user: null
    };

    componentDidMount() {
        this.getUserData();
        Hub.listen("auth", this, 'onHubCapsule')
    }

    getUserData = async () => {
        const user = await Auth.currentAuthenticatedUser()
        user ? this.setState({user}) : this.setState({user: null})
    }

    onHubCapsule = capsule => {
        switch (capsule.payload.event) {
            case "signIn":
                console.log("signed in")
                this.getUserData()
                break;
            case "signUp":
                console.log("signed up")
                break;
            case "signOut":
                console.log("signed out")
                this.setState({user: null})
                break;
            default:
                return;
        }
    }

    handleSignOut = async () => {
        try {
            await Auth.signOut()
        } catch (err) {
            console.error('Error signing out user', err)
        }
    }

    render() {
        const {user} = this.state

        return !user ? (
            <Authenticator theme={theme}/>
        ) : (
            <UserContext.Provider value={{user}}>
                <Router>
                    <>
                        {/*NavBar*/}
                        <Navbar user={user} handleSignOut={this.handleSignOut}/>

                        {/*Routes*/}
                        <div className="app-container">
                            <Route exact path={"/"} component={HomePage}/>
                            <Route path={'/blogs/:blogId'}
                                   component={({match}) => (
                                       <BlogPage user={user}
                                                 blogId={match.params.blogId}/>
                                   )}
                            />
                            <Route path={"/posts/:postId"}
                                   component={({match}) => (
                                       <PostPage user={user}
                                                 postId={match.params.postId}
                                       />
                                   )}
                            />
                        </div>
                    </>
                </Router>
            </UserContext.Provider>)
    }
}

const theme = {
    ...AmplifyTheme,
    navBar: {
        ...AmplifyTheme.navBar,
        backgroundColor: "#679b9b"
    },
    button: {
        ...AmplifyTheme.button,
        backgroundColor: "#679b9b",
        color: "white"
    },
    sectionBody: {
        ...AmplifyTheme.sectionBody,
        padding: "10px"
    },
    sectionHeader: {
        ...AmplifyTheme.sectionHeader,
        backgroundColor: "#679b9b"
    },
    formContainer: {
        ...AmplifyTheme.formContainer,
        marginTop: "15%"
    }
};

export default App;
