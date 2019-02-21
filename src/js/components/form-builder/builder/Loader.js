import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

class Loader extends Component {

    render() {

        return <div className="loader">
            <CircularProgress />
        </div>;
    }
}

Loader.propTypes = {

};


/**
 * Mapping state to props
 *
 * @param state
 * @param props
 */
const mapStateToProps = (state, props) => {

    return {

    }
};

/**
 * Mapping actions to props
 *
 */
const mapActionsToProps = {

};

export default connect(mapStateToProps, mapActionsToProps)(Loader);
