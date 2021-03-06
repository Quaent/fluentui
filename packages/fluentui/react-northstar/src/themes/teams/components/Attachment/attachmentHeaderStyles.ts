import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

import { AttachmentHeaderStylesProps } from '../../../../components/Attachment/AttachmentHeader';
import { AttachmentVariables } from './attachmentVariables';

const attachmentHeaderStyles: ComponentSlotStylesPrepared<AttachmentHeaderStylesProps, AttachmentVariables> = {
  root: ({ variables: v }): ICSSInJSStyle => ({
    display: 'block',

    fontSize: v.headerFontSize,
    fontWeight: v.headerFontWeight,
    lineHeight: v.headerLineHeight,
  }),
};

export default attachmentHeaderStyles;
