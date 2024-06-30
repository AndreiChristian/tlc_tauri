import { RecordModel, RecordService } from "pocketbase";
import PocketBase from 'pocketbase';

export interface Issue extends RecordModel {
  title: string,
  description: string | null,
  solved: boolean,
  urgent: boolean
}

export interface Staff extends RecordModel {
  name: string,
  familyName: string,
  role: "bucatarie" | "impachetare" | "livrare" | "altele",
  active: boolean
}

export interface InventoryRecord extends RecordModel {
  scriptic: number,
  faptic: number,
  name: string,
}


export interface TypedPocketbase extends PocketBase {
  collection(idOrName: string): RecordService // default fallback for any other collection
  collection(idOrName: 'issue'): RecordService<Issue>
  collection(idOrName: 'staff'): RecordService<Staff>
}

