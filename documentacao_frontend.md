# Documentação de Desenvolvimento — Frontend
## Plataforma de IA Agêntica para Manutenção e Facilities Management
**Stack:** React 18 · TypeScript · Vite · TanStack Query · shadcn/ui · Tailwind CSS · Auth0 SPA SDK

---

## 1. Visão Geral e Objetivos

O frontend é uma **SPA (Single Page Application)** responsiva e PWA-ready que conecta gestores e analistas de facilities com os dados operacionais consolidados da plataforma. Ele consome exclusivamente a API REST (`/api/v1/`) e o endpoint de WebSocket do backend FastAPI.

### Objetivos da Interface (V1)
- Visualizar KPIs e indicadores de manutenção por filial/unidade em tempo real
- Gerenciar e filtrar Ordens de Serviço e Ativos consolidados de múltiplas fontes
- Conversar com o **Q&A Agent** em linguagem natural via chat
- Solicitar e baixar relatórios personalizados (PDF e Excel)
- Configurar integrações, usuários e permissões
- Visualizar logs de auditoria de acessos e ações

---

## 2. Stack Tecnológica

| Camada | Tecnologia | Versão Alvo | Justificativa |
|---|---|---|---|
| Framework | React | 18 | Concurrent features, Suspense, performance |
| Linguagem | TypeScript | 5.x | Tipagem forte para contratos de API |
| Build Tool | Vite | 5.x | HMR instantâneo, build rápido |
| Server State | TanStack Query (React Query) | 5.x | Cache, refetch, loading/error states automáticos |
| Client State | Zustand | 4.x | Estado global leve (user, tenant, sidebar) |
| Roteamento | React Router | 6.x | Nested routes, loaders, actions |
| Estilização | Tailwind CSS | 3.x | Utility-first, coerência visual |
| Componentes UI | shadcn/ui | latest | Acessível, customizável, Radix UI primitives |
| Formulários | React Hook Form + Zod | latest | Validação tipada e performática |
| Autenticação | Auth0 React SDK | 2.x | Login/logout SSO, token automático |
| Gráficos | Recharts | 2.x | Composable, compatível com Tailwind |
| Internacionalização | react-i18next | latest | Suporte pt-BR, en-US |
| Testes Unitários | Vitest + Testing Library | latest | Rápido, compatível com Vite |
| Testes E2E | Playwright | latest | Cross-browser, CI integrado |

---

## 3. Estrutura de Pastas

```
frontend/
├── public/                     # Assets estáticos (favicon, manifest PWA)
├── src/
│   ├── main.tsx                # Ponto de entrada, providers globais
│   ├── App.tsx                 # Router root
│   │
│   ├── auth/                   # Integração Auth0
│   │   ├── AuthProvider.tsx    # Wrapper Auth0Provider + contexto de tenant
│   │   └── ProtectedRoute.tsx  # HOC para rotas autenticadas
│   │
│   ├── api/                    # Camada de comunicação com backend
│   │   ├── client.ts           # Axios instance com interceptors (token + x-tenant-id)
│   │   ├── assets.ts           # Funções fetch para /api/v1/assets
│   │   ├── work_orders.ts      # Funções fetch para /api/v1/work_orders
│   │   └── ai.ts               # Funções fetch para /api/v1/ai/chat
│   │
│   ├── hooks/                  # React Query hooks
│   │   ├── useAssets.ts
│   │   ├── useWorkOrders.ts
│   │   └── useAIChat.ts
│   │
│   ├── store/                  # Zustand stores
│   │   ├── useAuthStore.ts     # User, tenant_id, roles
│   │   └── useUIStore.ts       # Sidebar aberto/fechado, tema
│   │
│   ├── components/             # Componentes reutilizáveis
│   │   ├── ui/                 # Re-exports do shadcn/ui
│   │   ├── layout/
│   │   │   ├── AppShell.tsx    # Layout principal com sidebar + topbar
│   │   │   ├── Sidebar.tsx
│   │   │   └── TopBar.tsx
│   │   ├── data/
│   │   │   ├── DataTable.tsx   # Tabela reutilizável com paginação e filtros
│   │   │   ├── KpiCard.tsx     # Card de indicador com variação %
│   │   │   └── StatusBadge.tsx # Badge colorido por status da OS
│   │   ├── ai/
│   │   │   ├── ChatBubble.tsx  # Balão de mensagem
│   │   │   └── ChatInput.tsx   # Input com envio por Enter
│   │   └── feedback/
│   │       ├── EmptyState.tsx
│   │       └── ErrorBoundary.tsx
│   │
│   ├── pages/                  # Telas da aplicação
│   │   ├── Login/
│   │   │   └── LoginPage.tsx
│   │   ├── Dashboard/
│   │   │   ├── DashboardPage.tsx
│   │   │   └── components/
│   │   │       ├── KpiGrid.tsx
│   │   │       └── WorkOrdersChart.tsx
│   │   ├── Assets/
│   │   │   ├── AssetsPage.tsx
│   │   │   └── AssetDetailPage.tsx
│   │   ├── WorkOrders/
│   │   │   ├── WorkOrdersPage.tsx
│   │   │   └── WorkOrderDetailPage.tsx
│   │   ├── AIChat/
│   │   │   └── AIChatPage.tsx
│   │   ├── Reports/
│   │   │   └── ReportsPage.tsx
│   │   ├── Settings/
│   │   │   ├── SettingsPage.tsx
│   │   │   └── UsersSettingsPage.tsx
│   │   └── Audit/
│   │       └── AuditPage.tsx
│   │
│   ├── types/                  # TypeScript types (espelham schemas do backend)
│   │   ├── asset.ts
│   │   ├── work_order.ts
│   │   └── ai.ts
│   │
│   └── lib/                    # Utilitários
│       ├── utils.ts            # cn(), formatDate(), formatCurrency()
│       └── constants.ts        # STATUS_COLORS, SOURCE_LABELS, etc.
│
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── .env.local                  # VITE_API_URL, VITE_AUTH0_DOMAIN, etc.
```

---

## 4. Configuração do Projeto

### 4.1 Variáveis de Ambiente (`.env.local`)

```bash
VITE_API_BASE_URL=http://localhost:8000
VITE_AUTH0_DOMAIN=your-tenant.auth0.com
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
VITE_AUTH0_AUDIENCE=https://api.agentic-bi.com
```

### 4.2 Inicialização

```bash
# Criar o projeto
npm create vite@latest frontend -- --template react-ts
cd frontend

# Instalar dependências
npm install @tanstack/react-query axios zustand react-router-dom \
  @auth0/auth0-react react-hook-form zod recharts \
  react-i18next i18next

# Instalar shadcn/ui
npx shadcn@latest init
npx shadcn@latest add button card badge table input dialog sheet

# Instalar dev dependencies
npm install -D @testing-library/react @testing-library/jest-dom \
  vitest @playwright/test @vitejs/plugin-react
```

---

## 5. Autenticação com Auth0

### 5.1 Provider Global (`src/auth/AuthProvider.tsx`)

```tsx
import { Auth0Provider } from '@auth0/auth0-react';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        // Solicita o org_id para multi-tenancy
        organization: getOrgFromSubdomain(), // ou query param
      }}
    >
      {children}
    </Auth0Provider>
  );
}
```

### 5.2 Cliente HTTP (`src/api/client.ts`)

```typescript
import axios from 'axios';
import { Auth0Client } from '@auth0/auth0-spa-js';

// Instância Axios configurada
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Interceptor injeta o Bearer Token em toda requisição
apiClient.interceptors.request.use(async (config) => {
  const token = await auth0Client.getTokenSilently();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

### 5.3 Rota Protegida (`src/auth/ProtectedRoute.tsx`)

```tsx
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  
  if (isLoading) return <FullPageSpinner />;
  if (!isAuthenticated) {
    loginWithRedirect();
    return null;
  }
  return <>{children}</>;
}
```

---

## 6. Contratos de API (Backend ↔ Frontend)

### 6.1 Endpoints Disponíveis

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/health` | Health check do backend |
| `GET` | `/api/v1/assets/` | Lista ativos paginados do tenant |
| `GET` | `/api/v1/assets/{id}` | Detalhe de um ativo |
| `GET` | `/api/v1/work_orders/` | Lista OSs paginadas do tenant |
| `GET` | `/api/v1/work_orders/{id}` | Detalhe de uma OS |
| `POST` | `/api/v1/ai/chat/` | Envia mensagem para o Q&A Agent |

> [!NOTE]
> Todos os endpoints que retornam dados operacionais exigem o cabeçalho `x-tenant-id` injetado automaticamente pelo middleware do backend via o claim `org_id` do JWT Auth0. O frontend não precisa gerenciar isso manualmente.

### 6.2 TypeScript Types (espelham os schemas Pydantic do backend)

```typescript
// src/types/asset.ts
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

// src/types/work_order.ts
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

// src/types/ai.ts
export interface ChatRequest {
  message: string;
  session_id?: string;
}

export interface ChatResponse {
  response: string;
  agent_used: string;
}
```

### 6.3 React Query Hooks

```typescript
// src/hooks/useWorkOrders.ts
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api/client';
import type { WorkOrder } from '../types/work_order';

export function useWorkOrders(params?: { skip?: number; limit?: number }) {
  return useQuery<WorkOrder[]>({
    queryKey: ['work_orders', params],
    queryFn: async () => {
      const { data } = await apiClient.get('/api/v1/work_orders/', { params });
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}

// src/hooks/useAIChat.ts
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../api/client';

export function useAIChat() {
  return useMutation({
    mutationFn: async (message: string) => {
      const { data } = await apiClient.post('/api/v1/ai/chat/', {
        message,
        session_id: crypto.randomUUID(),
      });
      return data;
    },
  });
}
```

---

## 7. Telas da V1 — Especificações

### 7.1 Login (`/login`)
- Botão "Entrar com SSO" → redireciona para Auth0 Universal Login
- Suporte a MFA (via Auth0)
- Após login, redirecionar para `/dashboard`
- Não implementar formulário de login próprio

### 7.2 Dashboard (`/dashboard`)
- **Grid de KPIs (6–8 cards):** total de OSs abertas, OSs críticas, tempo médio de resolução, custo do mês, ativos ativos vs. inativos, OSs por fonte (Infraspeak vs. Sankhya)
- **Gráfico de linha:** evolução de OSs abertas/fechadas nos últimos 30 dias
- **Gráfico de barras:** OSs por status (Pendente, Em Andamento, Resolvido)
- **Tabela rápida:** últimas 5 OSs criadas com link para detalhe
- Filtros: período (7d / 30d / 90d) e filial/unidade
- Todos os dados via `useWorkOrders` e `useAssets` com `staleTime` de 5 min

**`KpiCard` Props:**
```tsx
interface KpiCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: number;      // % variação em relação ao período anterior
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
}
```

### 7.3 Ativos (`/assets`)
- Tabela de ativos com colunas: Nome, Categoria, Status, Fonte, Data de criação
- Filtros: Fonte (Infraspeak/Sankhya), Status, Busca por nome
- Paginação: `skip` + `limit` via parâmetros de query
- Badge colorido por status (verde = ativo, cinza = inativo, amarelo = manutenção)
- Clique na linha → `/assets/:id` (detalhe)

**Detalhe do Ativo (`/assets/:id`):**
- Card com todas as propriedades principais
- Histórico de OSs vinculadas ao ativo (filtrado por `asset_id`)
- Aba "Metadados" para exibir o JSON bruto do campo `metadata_`

### 7.4 Ordens de Serviço (`/work-orders`)
- Tabela com colunas: Título, Status, Prioridade, Ativo, Fonte, Aberta em, Custo
- Filtros: Status, Fonte, Prioridade (1–5), Período de abertura
- Ordenação por colunas (aberta em, custo)
- Paginação client-side ou server-side
- Badge de prioridade com cores: P1=vermelho, P2=laranja, P3=amarelo, P4=azul, P5=cinza

**Detalhe da OS (`/work-orders/:id`):**
- Timeline de eventos (criação → execução → conclusão)
- Card de custo e datas
- Ativo vinculado (link clicável)
- Campo `metadata_` em aba colapsável

### 7.5 Chat com IA (`/ai/chat`)
- Interface estilo chat (bolhas de mensagem)
- Campo de texto fixo no rodapé com envio por `Enter`
- Histórico da sessão mantido no estado local (`useState`)
- Indicador de digitação (loading state da mutation)
- Badge "Q&A Agent" exibindo qual agente respondeu
- Botão "Nova Conversa" limpa o histórico local
- Mensagens de erro formatadas em bolha vermelha

**Skeleton de implementação:**
```tsx
export function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const { mutate: sendMessage, isPending } = useAIChat();

  const handleSend = (text: string) => {
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    sendMessage(text, {
      onSuccess: (data) => {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      }
    });
  };

  return (
    <div className="flex flex-col h-full">
      <ChatMessageList messages={messages} isLoading={isPending} />
      <ChatInput onSend={handleSend} disabled={isPending} />
    </div>
  );
}
```

### 7.6 Relatórios (`/reports`)
- Lista de relatórios gerados anteriormente (status: Pendente / Pronto / Erro)
- Botão "Solicitar Relatório" → modal com campo de prompt em linguagem natural
- Download de PDF/Excel quando status = Pronto
- Badge de status com animação de pulsação quando Pendente

### 7.7 Configurações (`/settings`)
- Aba "Integrações": status de saúde de cada ERP (Infraspeak, Sankhya) com botão Sync Manual
- Aba "Usuários": lista de usuários com role e botão de convite
- Aba "Geral": nome do tenant, configurações de timezone

### 7.8 Auditoria (`/audit`)
- Apenas acessível por roles `admin_tenant` e `superadmin`
- Tabela de log: timestamp, usuário, ação, entidade, IP
- Filtros: usuário, tipo de ação, período
- Export para CSV

---

## 8. Design System

### 8.1 Paleta de Cores

```css
/* tailwind.config.ts */
colors: {
  brand: {
    50:  '#f0f4ff',
    100: '#e0e9ff',
    500: '#4f6ef7',    /* Primária */
    600: '#3b56d9',    /* Hover */
    900: '#1a2a6b',    /* Dark */
  },
  status: {
    open:       '#f59e0b',   /* Amarelo — OS aberta */
    inProgress: '#3b82f6',   /* Azul — Em andamento */
    resolved:   '#10b981',   /* Verde — Resolvida */
    critical:   '#ef4444',   /* Vermelho — Crítico */
  }
}
```

### 8.2 Tipografia

```css
/* Google Fonts: Inter */
font-family: 'Inter', sans-serif;

/* Tamanhos */
/* Título de página: text-2xl font-bold */
/* Subtítulo: text-lg font-semibold */
/* Body: text-sm */
/* Caption: text-xs text-muted-foreground */
```

### 8.3 Layout Padrão

- Sidebar fixa à esquerda (240px) com links de navegação
- Topbar com logo, breadcrumb, avatar do usuário e botão de logout
- Área de conteúdo com `max-w-7xl mx-auto px-6 py-8`
- Mobile: sidebar colapsável com hamburger menu

---

## 9. Gerenciamento de Estado

### 9.1 Server State (TanStack Query)

Todos os dados vindos da API são gerenciados pelo TanStack Query. Seguir o padrão:

```typescript
// QueryKey convention: [recurso, filtros]
['assets']                    // lista completa
['assets', { skip: 0 }]      // paginada
['assets', 'detail', id]     // detalhe
['work_orders']
['ai', 'chat']
```

### 9.2 Client State (Zustand)

```typescript
// src/store/useAuthStore.ts
interface AuthState {
  user: User | null;
  tenantId: string | null;
  roles: string[];
  isAdmin: () => boolean;
}

// src/store/useUIStore.ts
interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  toggleSidebar: () => void;
}
```

---

## 10. Roteamento

```tsx
// src/App.tsx
<Routes>
  <Route path="/login" element={<LoginPage />} />
  
  <Route element={<ProtectedRoute><AppShell /></ProtectedRoute>}>
    <Route path="/" element={<Navigate to="/dashboard" />} />
    <Route path="/dashboard" element={<DashboardPage />} />
    
    <Route path="/assets">
      <Route index element={<AssetsPage />} />
      <Route path=":id" element={<AssetDetailPage />} />
    </Route>
    
    <Route path="/work-orders">
      <Route index element={<WorkOrdersPage />} />
      <Route path=":id" element={<WorkOrderDetailPage />} />
    </Route>
    
    <Route path="/ai/chat" element={<AIChatPage />} />
    <Route path="/reports" element={<ReportsPage />} />
    <Route path="/settings" element={<SettingsPage />} />
    <Route path="/audit" element={
      <RequireRole role="admin_tenant"><AuditPage /></RequireRole>
    } />
    
    <Route path="*" element={<NotFoundPage />} />
  </Route>
</Routes>
```

---

## 11. Tratamento de Erros

```typescript
// Padrão de erro da API (backend retorna isso em caso de falha)
interface APIError {
  detail: string;
}

// Interceptor para tratar erros globalmente
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado: redirecionar para logout Auth0
      auth0Client.logout();
    }
    if (error.response?.status === 400 && 
        error.response.data.detail === 'Tenant context missing') {
      // Tenant não identificado: mostrar tela de erro de configuração
      toast.error('Configuração de tenant inválida. Contate o suporte.');
    }
    return Promise.reject(error);
  }
);
```

---

## 12. Testes

### 12.1 Unitários (Vitest)

```typescript
// src/hooks/useWorkOrders.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../test-utils';
import { useWorkOrders } from './useWorkOrders';

test('deve retornar lista de work orders', async () => {
  const { result } = renderHook(() => useWorkOrders(), { wrapper: createWrapper() });
  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(result.current.data).toBeDefined();
});
```

### 12.2 E2E (Playwright)

```typescript
// tests/dashboard.spec.ts
test('dashboard exibe KPI cards', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.getByTestId('kpi-total-work-orders')).toBeVisible();
  await expect(page.getByTestId('kpi-critical-orders')).toBeVisible();
});
```

---

## 13. Checklist de Desenvolvimento

### Fase 1 — Setup e Autenticação
- [ ] Criar projeto Vite + React + TypeScript
- [ ] Configurar Tailwind CSS e shadcn/ui
- [ ] Configurar React Router com estrutura de rotas
- [ ] Implementar Auth0Provider e ProtectedRoute
- [ ] Criar `apiClient` com interceptor de token JWT
- [ ] Configurar TanStack Query com QueryClientProvider
- [ ] Criar Zustand stores (auth, UI)
- [ ] Implementar AppShell (Sidebar + TopBar)
- [ ] Tela de Login com botão SSO

### Fase 2 — Telas Operacionais
- [ ] Dashboard com KpiGrid e gráficos Recharts
- [ ] Página de Ativos com DataTable, filtros e paginação
- [ ] Detalhe do Ativo
- [ ] Página de Ordens de Serviço com filtros e StatusBadge
- [ ] Detalhe da Ordem de Serviço com timeline

### Fase 3 — IA e Relatórios
- [ ] Página de Chat com IA (bubble UI + loading)
- [ ] Integração com endpoint `POST /api/v1/ai/chat/`
- [ ] Página de Relatórios com solicitação por prompt

### Fase 4 — Configurações e Polimento
- [ ] Página de Configurações (Integrações, Usuários, Geral)
- [ ] Página de Auditoria com controle de acesso por role
- [ ] Tema dark/light e responsividade mobile
- [ ] Internacionalização pt-BR
- [ ] Cobertura de testes ≥ 60%
- [ ] Acessibilidade WCAG 2.1 AA
- [ ] PWA manifest e service worker

---

## 14. Variáveis Necessárias do Backend para o Frontend

| Variável | Onde configurar | Observação |
|---|---|---|
| URL da API | `.env.local` → `VITE_API_BASE_URL` | `http://localhost:8000` em dev |
| Auth0 Domain | `.env.local` → `VITE_AUTH0_DOMAIN` | Configurado no painel Auth0 |
| Auth0 Client ID | `.env.local` → `VITE_AUTH0_CLIENT_ID` | SPA Application no Auth0 |
| Auth0 Audience | `.env.local` → `VITE_AUTH0_AUDIENCE` | Deve bater com o `AUTH0_API_AUDIENCE` do backend |

> [!IMPORTANT]
> O `VITE_AUTH0_AUDIENCE` do frontend deve ser **exatamente igual** ao `AUTH0_API_AUDIENCE` configurado no backend (`app/config.py` / `.env`). Qualquer divergência causará erro `401 Unauthorized` nas chamadas de API.

> [!WARNING]
> O campo `metadata_` retornado pelos endpoints de Assets e Work Orders pode conter estruturas aninhadas arbitrárias. Sempre usar optional chaining (`?.`) e fallback ao renderizar campos desse objeto, nunca asumir estrutura fixa.
