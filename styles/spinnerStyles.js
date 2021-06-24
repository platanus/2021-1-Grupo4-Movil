import { StyleSheet } from 'react-native';
import colors from './appColors';

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  activityIndicatorText: {
    paddingTop: 15,
    color: colors.kitchengramWhite,
  },
});

export default styles;
