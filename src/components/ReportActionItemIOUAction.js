import React, {Component} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {withOnyx} from 'react-native-onyx';
import _ from 'underscore';
import ONYXKEYS from '../ONYXKEYS';
import ReportActionItemIOUQuote from './ReportActionItemIOUQuote';
import ReportActionPropTypes from '../pages/home/report/ReportActionPropTypes';
import ReportActionItemIOUPreview from './ReportActionItemIOUPreview';
import {launchDetailsFromIOUAction} from '../libs/actions/IOU';

const propTypes = {
    // All the data of the action
    action: PropTypes.shape(ReportActionPropTypes).isRequired,

    // The linked iouReportID
    // eslint-disable-next-line react/no-unused-prop-types
    iouReportID: PropTypes.number,

    // Should render the preview Component?
    shouldDisplayPreviewComp: PropTypes.bool.isRequired,

    /* --- Onyx Props --- */
    // Active IOU Report for current report
    iou: PropTypes.shape({
        // Email address of the manager in this iou report
        managerEmail: PropTypes.string,

        // Email address of the creator of this iou report
        ownerEmail: PropTypes.string,

        // Outstanding amount of this transaction
        cachedTotal: PropTypes.string,
    }),

    // Session info for the currently logged in user.
    session: PropTypes.shape({
        // Currently logged in user email
        email: PropTypes.string,
    }).isRequired,
};

const defaultProps = {
    iou: {},
    iouReportID: null,
};

class ReportActionItemIOUAction extends Component {
    constructor(props) {
        super(props);

        this.launchIOUDetailsModal = this.launchIOUDetailsModal.bind(this);
    }

    launchIOUDetailsModal() {
        launchDetailsFromIOUAction(this.props.action);
    }

    render() {
        return (
            <View>
                <ReportActionItemIOUQuote action={this.props.action} />
                {this.props.shouldDisplayPreviewComp && !_.isEmpty(this.props.iou) && (
                    <ReportActionItemIOUPreview
                        iou={this.props.iou}
                        session={this.props.session}
                        onPayButtonPressed={this.launchIOUDetailsModal}
                    />
                )}
            </View>
        );
    }
}

ReportActionItemIOUAction.propTypes = propTypes;
ReportActionItemIOUAction.defaultProps = defaultProps;
ReportActionItemIOUAction.displayName = 'ReportActionItemIOUAction';

export default withOnyx({
    iou: {
        key: ({iouReportID}) => `${ONYXKEYS.COLLECTION.REPORT_IOUS}${iouReportID}`,
    },
    session: {
        key: ONYXKEYS.SESSION,
    },
})(ReportActionItemIOUAction);
