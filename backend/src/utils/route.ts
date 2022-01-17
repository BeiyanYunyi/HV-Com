import path from 'path';

const root = path.resolve(__dirname, '../../../');

/** defined some route */
const route = {
  root,
  logRoute: path.join(root, 'log'),
  tempDBRoute: path.join(root, 'temp', 'JUST_FOR_TEST.db'),
};

export default route;
