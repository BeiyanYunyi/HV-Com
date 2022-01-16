import path from 'path';

const root = path.resolve(__dirname, '../../../');

/** defined some route */
const route = { root, logRoute: path.join(root, 'log') };

export default route;
