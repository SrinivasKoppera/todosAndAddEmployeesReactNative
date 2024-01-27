import React from 'react';
import {MainStack} from './routing';
import {SheetProvider} from 'react-native-actions-sheet';

function App(): React.JSX.Element {
  return (
    <SheetProvider>
      <MainStack />
    </SheetProvider>
  );
}

export default App;
