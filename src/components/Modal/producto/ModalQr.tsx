import Modal from 'components/Animate/modal';
import React, { FunctionComponent} from 'react';
import QRCode from 'react-native-qrcode-generator';
import { Cancel, CancelTxt } from 'views/Producto/styled';

type ModaQrProps = {
  qr:boolean;
  productosQr:string;
  showQr:()=>void;
}
const ModalQr :FunctionComponent<ModaQrProps> = ({productosQr,qr,showQr}) => {
  return (
    <Modal lott={false} show={qr}>
        <QRCode
          value={productosQr}
          size={200}
          bgColor="black"
          fgColor="white"
        />
        <Cancel onPress={showQr}>
          <CancelTxt>X Cerrar</CancelTxt>
        </Cancel>
      </Modal>
  );
}

export default ModalQr;