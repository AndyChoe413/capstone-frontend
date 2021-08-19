import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

// import topBar from './src/components/topbar/TopBar'
// import header from './src/components/header/Header'
import Home from './src/pages/home/Home'
import Login from './src/pages/login/Login'
import Register from './src/pages/register/Register'
import Write from './src/pages/write/Write'
import Single from './src/pages/single/Single'
import Settings from './src/pages/settings/Settings'



export default function MainRouter() {
    return (
        <>
            
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/register' component={Register } />
                <Route exact path='/login' component={ Login} />
                <Route exact path='/Write' component={ Write} />
                <Route exact path='/settings' component={ Settings} />
                <Route exact path='/post/:postId' component={Single }/>
            </Switch>
        </>
    )
}
