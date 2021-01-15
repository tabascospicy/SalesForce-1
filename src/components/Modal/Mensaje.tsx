
import React, {useContext} from 'react';
import {Button, Dialog, Paragraph, Portal} from 'react-native-paper';
import Context from 'services/context';

const Mensaje = () => {
  const {seeMessage, hideMensaje} = useContext(Context);
  const {visible, title, body, render,actions} = seeMessage as MensajeContent;
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideMensaje}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>
            {body}
          </Paragraph>
          {render && render({})}
        </Dialog.Content>
        <Dialog.Actions>
          {actions ? actions({}): <Button onPress={hideMensaje}>Hecho</Button>}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default React.memo(Mensaje);
