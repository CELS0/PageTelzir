import { RootStackParamList } from '../routes/root.routes';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}