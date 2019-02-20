import React, {Component} from "react";
import Button from "@material-ui/core/Button/Button";
import * as PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {resetForm} from "../../../actions/form-builder-actions";

class Buttons extends Component {

    render() {

        return [this.submitButton(), this.resetButton(), this.cancelButton(), this.deleteButton()].filter(
            button => button !== null
        );
    }

    /**
     * submit Button creation
     * @returns {*}
     */
    submitButton() {
        if (!this.props.list.submit) {
            return null;
        }

        return <Button
            key="submit"
            type="submit"
            disabled={this.props.isDisabled}
            variant="contained"
            color="primary"
            className="submit"
            onClick={this.props.onSubmit}
        >{this.props.list.submit.label}</Button>;
    }

    /**
     * reset Button creation
     * @returns {*}
     */
    resetButton() {
        if (!this.props.list.reset) {
            return null;
        }

        return <Button
            key="reset"
            variant="contained"
            className="reset"
            onClick={this.props.onReset}
        >{this.props.list.reset.label}</Button>;
    }

    /**
     * cancel Button creation
     * @returns {*}
     */
    cancelButton() {
        if (!this.props.list.cancel) {
            return null;
        }

        return <Button
            key="cancel"
            variant="contained"
            className="cancel"
            onClick={this.props.onCancel}
        >{this.props.list.cancel.label}</Button>;
    }

    /**
     * delete Button creation
     * @returns {*}
     */
    deleteButton() {
        if (!this.props.list.delete) {
            return null;
        }

        return <Button
            key="delete"
            variant="contained"
            color="secondary"
            className="delete"
            onClick={this.props.onDelete}
        >{this.props.list.delete.label}</Button>;
    }

}

Buttons.propTypes = {
    list: PropTypes.object.isRequired,
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

    return {

    }
};

/**
 * Mapping actions to props
 *
 */
const mapActionsToProps = {

};

export default connect(mapStateToProps, mapActionsToProps)(Buttons);
