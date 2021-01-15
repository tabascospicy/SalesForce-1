import Reactotron from 'reactotron-react-native';
import {AsyncStorage} from "@react-native-community/async-storage"
Reactotron.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure() // controls connection & communication settings
  .useReactNative({
    asyncStorage: false, // there are more options to the async storage.
    networking: {
      // optionally, you can turn it off with false.
      ignoreUrls: /symbolicate/,
    },
    editor: false, // there are more options to editor
    errors: {veto: (stackFrame) => false}, // or turn it off with false
  }) // add all built-in react native plugins
  .connect(); // let's connect!
