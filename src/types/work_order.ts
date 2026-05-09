export interface WorkOrder {
  id: string;
  tenant_id: string;
  asset_id: string | null;
  external_id: string | null;
  source: 'infraspeak' | 'sankhya';
  title: string;
  status: string;
  priority: number | null;   // 1–5
  opened_at: string | null;
  closed_at: string | null;
  cost: string | null;       // Decimal como string
  metadata_: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}
