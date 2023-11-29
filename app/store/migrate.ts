import {createMigrate} from 'redux-persist';

export const migrate = createMigrate({
  1: state => {
    if (!state) {
      return;
    }
    return {...state};
  },
});

export default migrate;
