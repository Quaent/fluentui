import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { CardVariables } from './cardVariables';
import { CardTopControlsStylesProps } from '../../../../components/Card/CardTopControls';

const cardTopControlsStyles: ComponentSlotStylesPrepared<CardTopControlsStylesProps, CardVariables> = {
  root: ({ variables: v }): ICSSInJSStyle => {
    return {
      position: 'absolute',
      top: v.topControlsTop,
      right: v.topControlsRight,
    };
  },
};

export default cardTopControlsStyles;
