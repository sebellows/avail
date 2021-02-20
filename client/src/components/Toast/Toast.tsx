import styled from 'styled-components'
import { ToastContainer } from 'react-toastify'
import { cardStyle, CardStyleProps } from '../../elements'
import {
  borderStyle,
  flexItemStyle,
  marginStyle,
  paddingStyle,
  radiusStyle,
  shadowStyle,
  FlexSizeStyleProps,
  MarginStyleProps,
  PaddingStyleProps,
  RadiusStyleProps,
  BorderStyleProps,
  ShadowStyleProps,
} from '../../styles'

const Toast = styled(ToastContainer)<
  FlexSizeStyleProps &
    CardStyleProps &
    MarginStyleProps &
    PaddingStyleProps &
    RadiusStyleProps &
    BorderStyleProps &
    ShadowStyleProps
>(borderStyle, flexItemStyle, marginStyle, paddingStyle, radiusStyle, shadowStyle, cardStyle)

Toast.displayName = 'Toast'

export { Toast }
