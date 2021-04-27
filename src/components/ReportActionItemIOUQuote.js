import React from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'underscore';
import {launchDetailsFromIOUAction} from '../libs/actions/IOU';
import styles, {webViewStyles} from '../styles/styles';
import ReportActionPropTypes from '../pages/home/report/ReportActionPropTypes';

const propTypes = {
    // All the data of the action
    action: PropTypes.shape(ReportActionPropTypes).isRequired,
};

const ReportActionItemIOUQuote = ({action}) => (
    <View style={[styles.chatItemMessage]}>
        {_.map(action.message, (fragment, index) => (
            <View key={`iouQuote-${action.sequenceNumber}-${index}`}>
                <View style={[webViewStyles.tagStyles.blockquote]}>
                    <Text style={[styles.chatItemMessage]}>
                        {fragment.text}
                    </Text>
                    <Text
                        style={[styles.chatItemMessageLink]}
                        onPress={() => {
                            launchDetailsFromIOUAction(action);
                        }}
                    >
                        View Details
                    </Text>
                </View>
            </View>
        ))}
    </View>
);

ReportActionItemIOUQuote.propTypes = propTypes;
ReportActionItemIOUQuote.displayName = 'ReportActionItemIOUQuote';

export default ReportActionItemIOUQuote;
