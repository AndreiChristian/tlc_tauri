import PocketBase from 'pocketbase';
import { TypedPocketbase } from './types';

export const pb = new PocketBase('http://127.0.0.1:8090') as TypedPocketbase;
