import React, {Component} from 'react';
import {connect} from "react-redux";
import {changeMainView} from "./actions/main-view-actions";
import {Constants} from "./helpers/Constants";

class MainView extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        switch (this.props.mainView) {

            case Constants.state.LOGIN:

                return <div/>;

            default:

                this.props.changeMainView(Constants.state.LOGIN);
                break;
        }

        return <div/>;
    }
}

const mapStateToProps = state => ({
    mainView: state.mainView
});

const mapActionsToProps = {
    changeMainView: changeMainView
};

export default connect(mapStateToProps, mapActionsToProps)(MainView);
