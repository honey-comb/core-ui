import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

class Loader extends Component {

    constructor(props) {
        super(props);

        this.state = {
            opacity: 0
        }
    }

    render() {

        return <div className="loader" style={{opacity: this.state.opacity}}>
            <CircularProgress/>
        </div>;
    }

    componentDidMount() {

        setTimeout(() => {
            this.setState({opacity: 1})
        }, 10);
    }
}

Loader.propTypes = {};


/**
 * Mapping state to props
 *
 * @param state
 * @param props
 */
const mapStateToProps = (state, props) => {

    return {}
};

/**
 * Mapping actions to props
 *
 */
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(Loader);
