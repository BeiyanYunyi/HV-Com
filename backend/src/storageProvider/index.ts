import StorageProvider from '../../../types/StorageProvider';
import SequelizeStorageProvider from './sequelizeProvider';

const storageProvider: StorageProvider = new SequelizeStorageProvider();

export default storageProvider;
