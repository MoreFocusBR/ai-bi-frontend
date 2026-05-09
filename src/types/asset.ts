export interface Asset {
  id: string;          // UUID
  tenant_id: string;
  external_id: string | null;
  source: 'infraspeak' | 'sankhya';
  name: string;
  category: string | null;
  status: string | null;
  metadata_: Record<string, unknown> | null;
  created_at: string;  // ISO 8601
  updated_at: string;
}
