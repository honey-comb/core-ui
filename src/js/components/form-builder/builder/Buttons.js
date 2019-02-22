import React, {Component} from "react";
import Button from "@material-ui/core/Button/Button";
import * as PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";

class Buttons extends Component {

    render() {

        let buttons = [];

        this.props.list.map((value) => {

            switch (value.type) {

                case 'submit' :

                    buttons.push(this.submitButton(value.label));
                    break;

                case 'reset' :

                    buttons.push(this.resetButton(value.label));
                    break;

                case 'delete' :

                    buttons.push(this.deleteButton(value.label));
                    break;

                case 'cancel' :

                    buttons.push(this.cancelButton(value.label));
                    break;
            }
        });

        return buttons;
    }

    /**
     * submit Button creation
     *
     * @param label
     * @returns {*}
     */
    submitButton(label) {

        return <Button
            key="submit"
            type="submit"
            disabled={this.props.isDisabled}
            variant="contained"
            color="primary"
            className="submit"
            onClick={this.props.onSubmit}
        >{label}</Button>;
    }

    /**
     * reset Button creation
     *
     * @param label
     * @returns {*}
     */
    resetButton(label) {

        return <Button
            key="reset"
            variant="contained"
            className="reset"
            onClick={this.props.onReset}
        >{label}</Button>;
    }

    /**
     * cancel Button creation
     *
     * @param label
     * @returns {*}
     */
    cancelButton(label) {

        return <Button
            key="cancel"
            variant="contained"
            className="cancel"
            onClick={this.props.onCancel}
        >{label}</Button>;
    }

    /**
     * delete Button creation
     *
     * @param label
     * @returns {*}
     */
    deleteButton(label) {

        return <Button
            key="delete"
            variant="contained"
            color="secondary"
            className="delete"
            onClick={this.props.onDelete}
        >{label}</Button>;
    }

}

Buttons.propTypes = {
    list: PropTypes.array.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};


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

export default connect(mapStateToProps, mapActionsToProps)(Buttons);
