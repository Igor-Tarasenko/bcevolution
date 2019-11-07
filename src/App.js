import React, { Component } from 'react'
import ReactQueryParams from 'react-query-params'
import MainPage from './components/MainPage'
import SecondPage from './components/SecondPage'
import {Route, Switch, withRouter} from 'react-router-dom'
import Page from './pages/Page'
import {UserContext} from './helpers/dataContext';
// Pages
import * as Pages from './pages'


class App extends ReactQueryParams {
    state = {
        page: 'main',
        firstName: '',
        email: '',
        lastName: '',
        password: '',
        phoneNumber: '',
        countryCode: "",
        countryPrefix: ''
    };

    handleStep = (step) => {
        this.setState({step})
    };

    handleForward = (params) => {
        this.props.handleLeadStep(params);
    };

    handleSubmit = (params) => {
        this.props.onSubmit(params)
        .then(() =>  this.props.history.push('/'))
    };

    getValueFromInputs = e => {
        this.setState({ [e.target.name] : e.target.value});
    };

    savedPhoneNumber = value => {
        this.setState({phoneNumber: value});
    };

    defaultCountry = (countryData, countryPrefix) => {
        this.setState({
            countryCode: countryData,
            countryPrefix: countryPrefix
        });
    };

    pageHandler = (page) => {
        window.scrollTo(0, 0);

        switch (page) {
            default:  
                this.setState({page: 'main'});
                break;
            case 'agreement':
                this.setState({page: Pages.agreement});
                break;
            case 'privacy':
                this.setState({page: Pages.privacy});
                break;
            case 'gov':
                this.setState({page: Pages.gov});
                break;
            case 'risc':
                this.setState({page: Pages.risc});
                break;
        }

    };

    render() {
        if (this.state.page === 'main') {
            return (
                <div className='App'>
                    <Switch>
                        <UserContext.Provider value={{
                            firstName: this.state.firstName,
                            email: this.state.email,
                            lastName: this.state.lastName,
                            password: this.state.password,
                            phoneNumber: this.state.phoneNumber,
                            countryCode: this.state.countryCode,
                            countryPrefix: this.state.countryPrefix,
                            getValueFromInputs: this.getValueFromInputs,
                            savedPhoneNumber: this.savedPhoneNumber,
                            defaultCountry: this.defaultCountry
                        }}>
                            <Route exact path="/" render={() =>
                                <MainPage countryCode={this.props.countryCode}
                                          handleStep={this.handleStep} step={this.state.step} handleSubmit={this.handleSubmit}
                                          pageHandler={this.pageHandler}
                                          handleForward={this.handleForward}
                                          languageManager={this.props.languageManager}
                                          validateParams={this.props.validateParams}/>}
                            />
                            <Route path="/members" render={() =>
                                <SecondPage countryCode={this.props.countryCode}
                                            handleStep={this.handleStep} step={this.state.step} handleSubmit={this.handleSubmit}
                                            pageHandler={this.pageHandler}
                                            handleForward={this.handleForward}
                                            languageManager={this.props.languageManager}
                                            validateParams={this.props.validateParams}/>}
                            />
                        </UserContext.Provider>
                    </Switch>
                </div>
            )
        } else {
            return (
                <Page page={this.state.page} pageHandler={this.pageHandler}></Page>
            )
        }
    }
}
export default withRouter(App);
