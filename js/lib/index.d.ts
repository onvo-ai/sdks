declare class OnvoBase {
    #private;
    endpoint: string;
    /**
     * Fetches data from the API.
     * @param url - The URL to fetch data from.
     * @param method - The HTTP method to use. Defaults to "GET".
     * @param body - The data to send with the request.
     * @param isForm - Indicates if the request is a form request.
     * @returns The response from the API.
     * @throws {Error} If there is an error making the request.
     */
    fetchBase(url: string, method?: "GET" | "PUT" | "POST" | "DELETE" | "PATCH", body?: any, isForm?: boolean): Promise<any>;
    /**
     * Fetches a Blob from the API.
     * @param url - The URL to fetch data from.
     * @returns The response from the API as a Blob.
     * @throws {Error} If there is an error making the request.
     */
    fetchBlob(url: string): Promise<Blob>;
    constructor(apiKey: string, options?: {
        endpoint: string;
    });
}

type Json = string | number | boolean | null | {
    [key: string]: Json | undefined;
} | Json[];
interface Database {
    public: {
        Tables: {
            accounts: {
                Row: {
                    avatar_url: string | null;
                    email: string | null;
                    full_name: string | null;
                    id: string;
                    phone_number: string | null;
                    updated_at: string | null;
                };
                Insert: {
                    avatar_url?: string | null;
                    email?: string | null;
                    full_name?: string | null;
                    id: string;
                    phone_number?: string | null;
                    updated_at?: string | null;
                };
                Update: {
                    avatar_url?: string | null;
                    email?: string | null;
                    full_name?: string | null;
                    id?: string;
                    phone_number?: string | null;
                    updated_at?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "users_id_fkey";
                        columns: ["id"];
                        isOneToOne: true;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    }
                ];
            };
            api_keys: {
                Row: {
                    created_at: string | null;
                    hash: string;
                    id: string;
                    last_used_at: string | null;
                    prefix: string;
                    scopes: string[];
                    suffix: string;
                    team: string;
                    title: string;
                };
                Insert: {
                    created_at?: string | null;
                    hash: string;
                    id?: string;
                    last_used_at?: string | null;
                    prefix: string;
                    scopes?: string[];
                    suffix: string;
                    team: string;
                    title: string;
                };
                Update: {
                    created_at?: string | null;
                    hash?: string;
                    id?: string;
                    last_used_at?: string | null;
                    prefix?: string;
                    scopes?: string[];
                    suffix?: string;
                    team?: string;
                    title?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "api_keys_team_fkey";
                        columns: ["team"];
                        isOneToOne: false;
                        referencedRelation: "teams";
                        referencedColumns: ["id"];
                    }
                ];
            };
            automation_runs: {
                Row: {
                    automation: string;
                    id: string;
                    recipient_emails: string[] | null;
                    run_at: string;
                    status: string;
                    team: string;
                };
                Insert: {
                    automation: string;
                    id?: string;
                    recipient_emails?: string[] | null;
                    run_at?: string;
                    status: string;
                    team: string;
                };
                Update: {
                    automation?: string;
                    id?: string;
                    recipient_emails?: string[] | null;
                    run_at?: string;
                    status?: string;
                    team?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "automation_runs_automation_fkey";
                        columns: ["automation"];
                        isOneToOne: false;
                        referencedRelation: "automations";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "automation_runs_team_fkey";
                        columns: ["team"];
                        isOneToOne: false;
                        referencedRelation: "teams";
                        referencedColumns: ["id"];
                    }
                ];
            };
            automations: {
                Row: {
                    created_at: string;
                    created_by: string;
                    dashboard: string;
                    description: string | null;
                    email_format: string;
                    email_subject: string;
                    enabled: boolean;
                    id: string;
                    last_run_at: string | null;
                    last_updated_at: string;
                    last_updated_by: string | null;
                    next_run_at: string | null;
                    output_format: string;
                    recipient_type: string;
                    recipients: string[] | null;
                    schedule: string;
                    team: string;
                    timezone: string;
                    title: string;
                };
                Insert: {
                    created_at?: string;
                    created_by: string;
                    dashboard: string;
                    description?: string | null;
                    email_format: string;
                    email_subject: string;
                    enabled?: boolean;
                    id?: string;
                    last_run_at?: string | null;
                    last_updated_at?: string;
                    last_updated_by?: string | null;
                    next_run_at?: string | null;
                    output_format: string;
                    recipient_type: string;
                    recipients?: string[] | null;
                    schedule: string;
                    team: string;
                    timezone?: string;
                    title: string;
                };
                Update: {
                    created_at?: string;
                    created_by?: string;
                    dashboard?: string;
                    description?: string | null;
                    email_format?: string;
                    email_subject?: string;
                    enabled?: boolean;
                    id?: string;
                    last_run_at?: string | null;
                    last_updated_at?: string;
                    last_updated_by?: string | null;
                    next_run_at?: string | null;
                    output_format?: string;
                    recipient_type?: string;
                    recipients?: string[] | null;
                    schedule?: string;
                    team?: string;
                    timezone?: string;
                    title?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "automations_created_by_fkey";
                        columns: ["created_by"];
                        isOneToOne: false;
                        referencedRelation: "accounts";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "automations_dashboard_fkey";
                        columns: ["dashboard"];
                        isOneToOne: false;
                        referencedRelation: "dashboards";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "automations_last_updated_by_fkey";
                        columns: ["last_updated_by"];
                        isOneToOne: false;
                        referencedRelation: "accounts";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "automations_team_fkey";
                        columns: ["team"];
                        isOneToOne: false;
                        referencedRelation: "teams";
                        referencedColumns: ["id"];
                    }
                ];
            };
            dashboard_datasources: {
                Row: {
                    dashboard: string;
                    datasource: string;
                    team: string;
                };
                Insert: {
                    dashboard: string;
                    datasource: string;
                    team: string;
                };
                Update: {
                    dashboard?: string;
                    datasource?: string;
                    team?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "dashboard_datasources_dashboard_fkey";
                        columns: ["dashboard"];
                        isOneToOne: false;
                        referencedRelation: "dashboards";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "dashboard_datasources_datasource_fkey";
                        columns: ["datasource"];
                        isOneToOne: false;
                        referencedRelation: "datasources";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "dashboard_datasources_datasource_fkey";
                        columns: ["datasource"];
                        isOneToOne: false;
                        referencedRelation: "decrypted_datasources";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "dashboard_datasources_team_fkey";
                        columns: ["team"];
                        isOneToOne: false;
                        referencedRelation: "teams";
                        referencedColumns: ["id"];
                    }
                ];
            };
            dashboards: {
                Row: {
                    created_at: string;
                    created_by: string | null;
                    description: string | null;
                    filters: Json;
                    id: string;
                    last_updated_at: string;
                    last_updated_by: string | null;
                    parent_dashboard: string | null;
                    settings: Json;
                    team: string;
                    thumbnail: string | null;
                    title: string;
                };
                Insert: {
                    created_at?: string;
                    created_by?: string | null;
                    description?: string | null;
                    filters?: Json;
                    id?: string;
                    last_updated_at?: string;
                    last_updated_by?: string | null;
                    parent_dashboard?: string | null;
                    settings?: Json;
                    team: string;
                    thumbnail?: string | null;
                    title: string;
                };
                Update: {
                    created_at?: string;
                    created_by?: string | null;
                    description?: string | null;
                    filters?: Json;
                    id?: string;
                    last_updated_at?: string;
                    last_updated_by?: string | null;
                    parent_dashboard?: string | null;
                    settings?: Json;
                    team?: string;
                    thumbnail?: string | null;
                    title?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "dashboards_created_by_fkey";
                        columns: ["created_by"];
                        isOneToOne: false;
                        referencedRelation: "accounts";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "dashboards_last_updated_by_fkey";
                        columns: ["last_updated_by"];
                        isOneToOne: false;
                        referencedRelation: "accounts";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "dashboards_parent_dashboard_fkey";
                        columns: ["parent_dashboard"];
                        isOneToOne: false;
                        referencedRelation: "dashboards";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "dashboards_team_fkey";
                        columns: ["team"];
                        isOneToOne: false;
                        referencedRelation: "teams";
                        referencedColumns: ["id"];
                    }
                ];
            };
            datasources: {
                Row: {
                    columns: Json | null;
                    config: string | null;
                    created_at: string;
                    created_by: string | null;
                    description: string;
                    filters: Json;
                    id: string;
                    last_updated_at: string;
                    last_updated_by: string | null;
                    parameters: string | null;
                    sample_data: string | null;
                    size: number;
                    source: string;
                    team: string;
                    title: string;
                };
                Insert: {
                    columns?: Json | null;
                    config?: string | null;
                    created_at?: string;
                    created_by?: string | null;
                    description?: string;
                    filters?: Json;
                    id?: string;
                    last_updated_at?: string;
                    last_updated_by?: string | null;
                    parameters?: string | null;
                    sample_data?: string | null;
                    size?: number;
                    source: string;
                    team: string;
                    title: string;
                };
                Update: {
                    columns?: Json | null;
                    config?: string | null;
                    created_at?: string;
                    created_by?: string | null;
                    description?: string;
                    filters?: Json;
                    id?: string;
                    last_updated_at?: string;
                    last_updated_by?: string | null;
                    parameters?: string | null;
                    sample_data?: string | null;
                    size?: number;
                    source?: string;
                    team?: string;
                    title?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "datasources_created_by_fkey";
                        columns: ["created_by"];
                        isOneToOne: false;
                        referencedRelation: "accounts";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "datasources_last_updated_by_fkey";
                        columns: ["last_updated_by"];
                        isOneToOne: false;
                        referencedRelation: "accounts";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "datasources_team_fkey";
                        columns: ["team"];
                        isOneToOne: false;
                        referencedRelation: "teams";
                        referencedColumns: ["id"];
                    }
                ];
            };
            embed_users: {
                Row: {
                    created_at: string;
                    email: string | null;
                    id: string;
                    last_updated_at: string;
                    metadata: Json | null;
                    name: string;
                    team: string;
                };
                Insert: {
                    created_at?: string;
                    email?: string | null;
                    id: string;
                    last_updated_at?: string;
                    metadata?: Json | null;
                    name: string;
                    team: string;
                };
                Update: {
                    created_at?: string;
                    email?: string | null;
                    id?: string;
                    last_updated_at?: string;
                    metadata?: Json | null;
                    name?: string;
                    team?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "organisation_users_team_fkey";
                        columns: ["team"];
                        isOneToOne: false;
                        referencedRelation: "teams";
                        referencedColumns: ["id"];
                    }
                ];
            };
            integrations: {
                Row: {
                    config: string;
                    created_at: string;
                    provider: string;
                    team: string;
                };
                Insert: {
                    config: string;
                    created_at?: string;
                    provider: string;
                    team: string;
                };
                Update: {
                    config?: string;
                    created_at?: string;
                    provider?: string;
                    team?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "integrations_team_fkey";
                        columns: ["team"];
                        isOneToOne: false;
                        referencedRelation: "teams";
                        referencedColumns: ["id"];
                    }
                ];
            };
            invites: {
                Row: {
                    created_at: string;
                    email: string;
                    name: string;
                    team: string;
                };
                Insert: {
                    created_at?: string;
                    email: string;
                    name: string;
                    team: string;
                };
                Update: {
                    created_at?: string;
                    email?: string;
                    name?: string;
                    team?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "invites_team_fkey";
                        columns: ["team"];
                        isOneToOne: false;
                        referencedRelation: "teams";
                        referencedColumns: ["id"];
                    }
                ];
            };
            logs: {
                Row: {
                    cost: number | null;
                    created_at: string;
                    id: string;
                    messages: Json | null;
                    model: string;
                    success: boolean | null;
                    team: string;
                    tokens: number | null;
                    type: string;
                };
                Insert: {
                    cost?: number | null;
                    created_at?: string;
                    id?: string;
                    messages?: Json | null;
                    model: string;
                    success?: boolean | null;
                    team: string;
                    tokens?: number | null;
                    type: string;
                };
                Update: {
                    cost?: number | null;
                    created_at?: string;
                    id?: string;
                    messages?: Json | null;
                    model?: string;
                    success?: boolean | null;
                    team?: string;
                    tokens?: number | null;
                    type?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "logs_team_fkey";
                        columns: ["team"];
                        isOneToOne: false;
                        referencedRelation: "teams";
                        referencedColumns: ["id"];
                    }
                ];
            };
            members: {
                Row: {
                    account: string;
                    team: string;
                };
                Insert: {
                    account: string;
                    team: string;
                };
                Update: {
                    account?: string;
                    team?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "members_team_fkey";
                        columns: ["team"];
                        isOneToOne: false;
                        referencedRelation: "teams";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "members_user_fkey";
                        columns: ["account"];
                        isOneToOne: false;
                        referencedRelation: "accounts";
                        referencedColumns: ["id"];
                    }
                ];
            };
            questions: {
                Row: {
                    created_at: string;
                    dashboard: string;
                    id: string;
                    messages: Json;
                    query: string;
                    team: string | null;
                };
                Insert: {
                    created_at?: string;
                    dashboard: string;
                    id?: string;
                    messages?: Json;
                    query: string;
                    team?: string | null;
                };
                Update: {
                    created_at?: string;
                    dashboard?: string;
                    id?: string;
                    messages?: Json;
                    query?: string;
                    team?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "questions_dashboard_fkey";
                        columns: ["dashboard"];
                        isOneToOne: false;
                        referencedRelation: "dashboards";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "questions_team_fkey";
                        columns: ["team"];
                        isOneToOne: false;
                        referencedRelation: "teams";
                        referencedColumns: ["id"];
                    }
                ];
            };
            sessions: {
                Row: {
                    created_at: string;
                    dashboard: string;
                    embed_user: string;
                    parameters: string;
                    team: string;
                };
                Insert: {
                    created_at?: string;
                    dashboard: string;
                    embed_user: string;
                    parameters?: string;
                    team: string;
                };
                Update: {
                    created_at?: string;
                    dashboard?: string;
                    embed_user?: string;
                    parameters?: string;
                    team?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "sessions_dashboard_fkey";
                        columns: ["dashboard"];
                        isOneToOne: false;
                        referencedRelation: "dashboards";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "sessions_embed_user_fkey";
                        columns: ["embed_user", "team"];
                        isOneToOne: false;
                        referencedRelation: "embed_users";
                        referencedColumns: ["id", "team"];
                    }
                ];
            };
            subscription_plans: {
                Row: {
                    automations: boolean;
                    integrations: boolean;
                    name: string;
                    users: number | null;
                    widgets: number;
                };
                Insert: {
                    automations?: boolean;
                    integrations?: boolean;
                    name: string;
                    users?: number | null;
                    widgets?: number;
                };
                Update: {
                    automations?: boolean;
                    integrations?: boolean;
                    name?: string;
                    users?: number | null;
                    widgets?: number;
                };
                Relationships: [];
            };
            subscriptions: {
                Row: {
                    amount: number;
                    created_at: string;
                    currency: string;
                    interval: string;
                    period_end: string;
                    period_start: string;
                    product_name: string;
                    stripe_customer_id: string;
                    stripe_product_id: string;
                    stripe_subscription_id: string;
                    team: string;
                };
                Insert: {
                    amount: number;
                    created_at?: string;
                    currency: string;
                    interval: string;
                    period_end: string;
                    period_start?: string;
                    product_name: string;
                    stripe_customer_id: string;
                    stripe_product_id: string;
                    stripe_subscription_id: string;
                    team: string;
                };
                Update: {
                    amount?: number;
                    created_at?: string;
                    currency?: string;
                    interval?: string;
                    period_end?: string;
                    period_start?: string;
                    product_name?: string;
                    stripe_customer_id?: string;
                    stripe_product_id?: string;
                    stripe_subscription_id?: string;
                    team?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "subscriptions_product_name_fkey";
                        columns: ["product_name"];
                        isOneToOne: false;
                        referencedRelation: "subscription_plans";
                        referencedColumns: ["name"];
                    },
                    {
                        foreignKeyName: "subscriptions_team_fkey";
                        columns: ["team"];
                        isOneToOne: true;
                        referencedRelation: "teams";
                        referencedColumns: ["id"];
                    }
                ];
            };
            teams: {
                Row: {
                    created_at: string | null;
                    email: string | null;
                    id: string;
                    logo: string | null;
                    name: string | null;
                    phone_number: string | null;
                    stripe_id: string | null;
                };
                Insert: {
                    created_at?: string | null;
                    email?: string | null;
                    id?: string;
                    logo?: string | null;
                    name?: string | null;
                    phone_number?: string | null;
                    stripe_id?: string | null;
                };
                Update: {
                    created_at?: string | null;
                    email?: string | null;
                    id?: string;
                    logo?: string | null;
                    name?: string | null;
                    phone_number?: string | null;
                    stripe_id?: string | null;
                };
                Relationships: [];
            };
            widgets: {
                Row: {
                    cache: string | null;
                    code: string;
                    created_at: string;
                    dashboard: string;
                    h: number | null;
                    id: string;
                    messages: Json;
                    settings: Json;
                    team: string;
                    title: string;
                    w: number | null;
                    x: number | null;
                    y: number | null;
                };
                Insert: {
                    cache?: string | null;
                    code: string;
                    created_at?: string;
                    dashboard: string;
                    h?: number | null;
                    id?: string;
                    messages?: Json;
                    settings?: Json;
                    team: string;
                    title: string;
                    w?: number | null;
                    x?: number | null;
                    y?: number | null;
                };
                Update: {
                    cache?: string | null;
                    code?: string;
                    created_at?: string;
                    dashboard?: string;
                    h?: number | null;
                    id?: string;
                    messages?: Json;
                    settings?: Json;
                    team?: string;
                    title?: string;
                    w?: number | null;
                    x?: number | null;
                    y?: number | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "widgets_dashboard_fkey";
                        columns: ["dashboard"];
                        isOneToOne: false;
                        referencedRelation: "dashboards";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "widgets_team_fkey";
                        columns: ["team"];
                        isOneToOne: false;
                        referencedRelation: "teams";
                        referencedColumns: ["id"];
                    }
                ];
            };
        };
        Views: {
            decrypted_datasources: {
                Row: {
                    columns: Json | null;
                    config: string | null;
                    created_at: string | null;
                    created_by: string | null;
                    description: string | null;
                    filters: Json | null;
                    id: string | null;
                    last_updated_at: string | null;
                    last_updated_by: string | null;
                    parameters: string | null;
                    sample_data: string | null;
                    size: number | null;
                    source: string | null;
                    team: string | null;
                    title: string | null;
                };
                Insert: {
                    columns?: Json | null;
                    config?: never;
                    created_at?: string | null;
                    created_by?: string | null;
                    description?: string | null;
                    filters?: Json | null;
                    id?: string | null;
                    last_updated_at?: string | null;
                    last_updated_by?: string | null;
                    parameters?: never;
                    sample_data?: never;
                    size?: number | null;
                    source?: string | null;
                    team?: string | null;
                    title?: string | null;
                };
                Update: {
                    columns?: Json | null;
                    config?: never;
                    created_at?: string | null;
                    created_by?: string | null;
                    description?: string | null;
                    filters?: Json | null;
                    id?: string | null;
                    last_updated_at?: string | null;
                    last_updated_by?: string | null;
                    parameters?: never;
                    sample_data?: never;
                    size?: number | null;
                    source?: string | null;
                    team?: string | null;
                    title?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "datasources_created_by_fkey";
                        columns: ["created_by"];
                        isOneToOne: false;
                        referencedRelation: "accounts";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "datasources_last_updated_by_fkey";
                        columns: ["last_updated_by"];
                        isOneToOne: false;
                        referencedRelation: "accounts";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "datasources_team_fkey";
                        columns: ["team"];
                        isOneToOne: false;
                        referencedRelation: "teams";
                        referencedColumns: ["id"];
                    }
                ];
            };
            decrypted_integrations: {
                Row: {
                    config: string | null;
                    created_at: string | null;
                    provider: string | null;
                    team: string | null;
                };
                Insert: {
                    config?: never;
                    created_at?: string | null;
                    provider?: string | null;
                    team?: string | null;
                };
                Update: {
                    config?: never;
                    created_at?: string | null;
                    provider?: string | null;
                    team?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "integrations_team_fkey";
                        columns: ["team"];
                        isOneToOne: false;
                        referencedRelation: "teams";
                        referencedColumns: ["id"];
                    }
                ];
            };
            decrypted_sessions: {
                Row: {
                    created_at: string | null;
                    dashboard: string | null;
                    embed_user: string | null;
                    parameters: string | null;
                    team: string | null;
                };
                Insert: {
                    created_at?: string | null;
                    dashboard?: string | null;
                    embed_user?: string | null;
                    parameters?: never;
                    team?: string | null;
                };
                Update: {
                    created_at?: string | null;
                    dashboard?: string | null;
                    embed_user?: string | null;
                    parameters?: never;
                    team?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "sessions_dashboard_fkey";
                        columns: ["dashboard"];
                        isOneToOne: false;
                        referencedRelation: "dashboards";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "sessions_embed_user_fkey";
                        columns: ["embed_user", "team"];
                        isOneToOne: false;
                        referencedRelation: "embed_users";
                        referencedColumns: ["id", "team"];
                    }
                ];
            };
            decrypted_widgets: {
                Row: {
                    cache: string | null;
                    code: string | null;
                    created_at: string | null;
                    dashboard: string | null;
                    h: number | null;
                    id: string | null;
                    messages: Json | null;
                    settings: Json | null;
                    team: string | null;
                    title: string | null;
                    w: number | null;
                    x: number | null;
                    y: number | null;
                };
                Insert: {
                    cache?: never;
                    code?: string | null;
                    created_at?: string | null;
                    dashboard?: string | null;
                    h?: number | null;
                    id?: string | null;
                    messages?: Json | null;
                    settings?: Json | null;
                    team?: string | null;
                    title?: string | null;
                    w?: number | null;
                    x?: number | null;
                    y?: number | null;
                };
                Update: {
                    cache?: never;
                    code?: string | null;
                    created_at?: string | null;
                    dashboard?: string | null;
                    h?: number | null;
                    id?: string | null;
                    messages?: Json | null;
                    settings?: Json | null;
                    team?: string | null;
                    title?: string | null;
                    w?: number | null;
                    x?: number | null;
                    y?: number | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "widgets_dashboard_fkey";
                        columns: ["dashboard"];
                        isOneToOne: false;
                        referencedRelation: "dashboards";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "widgets_team_fkey";
                        columns: ["team"];
                        isOneToOne: false;
                        referencedRelation: "teams";
                        referencedColumns: ["id"];
                    }
                ];
            };
        };
        Functions: {
            can_create_widget: {
                Args: {
                    p_auth: Json;
                };
                Returns: boolean;
            };
            check_id_in_dashboards: {
                Args: {
                    id: string;
                    json_data: Json;
                };
                Returns: boolean;
            };
            string_to_uuid_array: {
                Args: {
                    input_string: string;
                };
                Returns: unknown;
            };
            stripe_can_create_automation: {
                Args: {
                    organisation: string;
                };
                Returns: boolean;
            };
            stripe_can_create_datasource: {
                Args: {
                    organisation: string;
                    type: string;
                };
                Returns: boolean;
            };
            stripe_can_create_invite: {
                Args: {
                    organisation: string;
                };
                Returns: boolean;
            };
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
}
type Tables<PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] & Database["public"]["Views"]) | {
    schema: keyof Database;
}, TableName extends PublicTableNameOrOptions extends {
    schema: keyof Database;
} ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] & Database[PublicTableNameOrOptions["schema"]]["Views"]) : never = never> = PublicTableNameOrOptions extends {
    schema: keyof Database;
} ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] & Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
    Row: infer R;
} ? R : never : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] & Database["public"]["Views"]) ? (Database["public"]["Tables"] & Database["public"]["Views"])[PublicTableNameOrOptions] extends {
    Row: infer R;
} ? R : never : never;
type TablesInsert<PublicTableNameOrOptions extends keyof Database["public"]["Tables"] | {
    schema: keyof Database;
}, TableName extends PublicTableNameOrOptions extends {
    schema: keyof Database;
} ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"] : never = never> = PublicTableNameOrOptions extends {
    schema: keyof Database;
} ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Insert: infer I;
} ? I : never : PublicTableNameOrOptions extends keyof Database["public"]["Tables"] ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
    Insert: infer I;
} ? I : never : never;
type TablesUpdate<PublicTableNameOrOptions extends keyof Database["public"]["Tables"] | {
    schema: keyof Database;
}, TableName extends PublicTableNameOrOptions extends {
    schema: keyof Database;
} ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"] : never = never> = PublicTableNameOrOptions extends {
    schema: keyof Database;
} ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Update: infer U;
} ? U : never : PublicTableNameOrOptions extends keyof Database["public"]["Tables"] ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
    Update: infer U;
} ? U : never : never;
type Enums<PublicEnumNameOrOptions extends keyof Database["public"]["Enums"] | {
    schema: keyof Database;
}, EnumName extends PublicEnumNameOrOptions extends {
    schema: keyof Database;
} ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"] : never = never> = PublicEnumNameOrOptions extends {
    schema: keyof Database;
} ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName] : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"] ? Database["public"]["Enums"][PublicEnumNameOrOptions] : never;

type Modify<A, B extends DeepPartialAny<A>> = {
    [K in keyof A | keyof B]: K extends keyof A ? K extends keyof B ? A[K] extends AnyObject ? B[K] extends AnyObject ? Modify<A[K], B[K]> : B[K] : B[K] : A[K] : B[K];
};
type AnyObject = Record<string, any>;
type DeepPartialAny<T> = {
    [P in keyof T]?: T[P] extends AnyObject ? DeepPartialAny<T[P]> : any;
};

declare enum Table {
    Countries = "countries",
    Invites = "invites",
    ItineraryInvites = "itinerary_invites",
    Itineraries = "itineraries",
    Members = "members",
    Teams = "teams",
    Travelers = "travelers",
    Accounts = "accounts",
    DataSources = "datasources",
    EmbedUsers = "embed_users",
    APIKeys = "api_keys",
    Widgets = "widgets",
    Dashboards = "dashboards",
    DashboardDatasources = "dashboard_datasources",
    Sessions = "sessions",
    Questions = "questions",
    Integrations = "integrations",
    DecryptedIntegrations = "decrypted_integrations",
    DecryptedSessions = "decrypted_sessions",
    DecryptedWidgets = "decrypted_widgets",
    DecryptedDatasources = "decrypted_datasources",
    Subscriptions = "subscriptions",
    SubscriptionPlans = "subscription_plans",
    Automations = "automations",
    AutomationRuns = "automation_runs",
    Logs = "logs"
}

type APIDatasourceConfig = {
    url?: string;
    type?: "json" | "csv" | "xml" | "excel";
    method?: "GET" | "POST";
    headers?: string;
    body?: string;
    transform?: string;
};
type OauthConfig = {
    access_token: string;
    refresh_token: string;
    access_expires_at: string;
    refresh_expires_at: string;
};
type FileDatasourceConfig = {
    url?: string;
    filename?: string;
    type?: "json" | "csv" | "xml" | "excel";
};
type RedshiftDatasourceConfig = {
    host: string;
    port: string;
    user: string;
    password: string;
    database: string;
    query: string;
};
type SQLDatasourceConfig = {
    host: string;
    user: string;
    password: string;
    database: string;
    query: string;
};
type PostgreSQLDatasourceConfig = {
    host: string;
    port: string;
    database: string;
    user: string;
    password: string;
    query: string;
};
type RootfiDatasourceConfig = {
    company_id: number;
    resource: string;
};
type MongoDBDatasourceConfig = {
    url: string;
    database: string;
    collection: string;
};
type AirtableDatasourceConfig = {
    baseId: string;
    baseName: string;
    tableId: string;
    tableName: string;
};
type GoogleSheetDatasourceConfig = {
    docId: string;
    sheetId: number;
    sheetName: string;
};
type ZohoDatasourceConfig = {
    product: string;
    module: string;
};
type FirestoreDatasourceConfig = {
    type: string;
    project_id: string;
    private_key_id: string;
    private_key: string;
    client_email: string;
    client_id: string;
    auth_uri: string;
    token_uri: string;
    auth_provider_x509_cert_url: string;
    client_x509_cert_url: string;
    universe_domain: string;
    databaseURL: string;
    collection: string;
};

type Settings = {
    theme: "dark" | "light" | "auto";
    dark_background: string;
    dark_foreground: string;
    dark_text: string;
    light_background: string;
    light_foreground: string;
    light_text: string;
    border_radius: number;
    font: string;
    hide_header: boolean;
    filters: boolean;
    can_ask_questions: boolean;
    can_edit_widgets: boolean;
    can_edit_widget_layout: boolean;
    can_create_widgets: boolean;
    can_delete_widgets: boolean;
    disable_download_images: boolean;
    disable_download_reports: boolean;
};
type Invite = Database["public"]["Tables"]["invites"]["Row"];
type Member = Database["public"]["Tables"]["members"]["Row"];
type Team = Database["public"]["Tables"]["teams"]["Row"];
type Account = Database["public"]["Tables"]["accounts"]["Row"];
type DataSource = Modify<Database["public"]["Tables"]["datasources"]["Row"], {
    columns: {
        title: string;
        description: string;
    }[];
}>;
type EmbedUser = Database["public"]["Tables"]["embed_users"]["Row"];
type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"];
type SubscriptionPlan = Database["public"]["Tables"]["subscription_plans"]["Row"];
type APIKey = Database["public"]["Tables"]["api_keys"]["Row"];
type Widget = Database["public"]["Tables"]["widgets"]["Row"];
type Dashboard = Modify<Database["public"]["Tables"]["dashboards"]["Row"], {
    settings?: Settings;
}>;
type DashboardDatasource = Database["public"]["Tables"]["dashboard_datasources"]["Row"];
type Session = Database["public"]["Tables"]["sessions"]["Row"];
type Question = Database["public"]["Tables"]["questions"]["Row"];
type Integration = Database["public"]["Tables"]["integrations"]["Row"];
type Automation = Database["public"]["Tables"]["automations"]["Row"];
type AutomationRun = Database["public"]["Tables"]["automation_runs"]["Row"];
type ComprehensiveDashboard = Dashboard & {
    datasources: DataSource[];
    widgets: Widget[];
};
type Log = Database["public"]["Tables"]["logs"]["Row"];

/**
 * Endpoints for managing accounts.
 */
declare class OnvoAccounts extends OnvoBase {
    /**
     * Fetches a list of accounts.
     *
     * @return {Promise<Account[]>} A promise that resolves to an array of Account objects.
     */
    list(): Promise<Account[]>;
    /**
     * Fetches a specific account by ID.
     *
     * @param {string} id - The ID of the account to fetch.
     * @return {Promise<Account>} A promise that resolves to an Account object.
     */
    get(id: string): Promise<Account>;
}

declare class OnvoTeams extends OnvoBase {
    /**
     * Retrieves a list of all teams.
     * @returns {Promise<Team[]>} A promise that resolves to an array of Team objects.
     */
    list(): Promise<Team[]>;
    /**
     * Retrieves a specific team by ID.
     * @param {string} id - The ID of the team to retrieve.
     * @returns {Promise<Team>} A promise that resolves to the Team object.
     */
    get(id: string): Promise<Team>;
    /**
     * Updates a specific team.
     * @param {string} id - The ID of the team to update.
     * @param {Partial<Team>} body - The updated team data.
     * @returns {Promise<Team>} A promise that resolves to the updated Team object.
     */
    update(id: string, body: Partial<Team>): Promise<Team>;
}

declare class OnvoEmbedUsers extends OnvoBase {
    /**
     * Retrieves a list of embed users.
     * @returns {Promise<EmbedUser[]>} A promise that resolves to an array of embed users.
     */
    list(): Promise<EmbedUser[]>;
    /**
     * Retrieves an embed user by ID.
     * @param {string} id - The ID of the embed user.
     * @returns {Promise<EmbedUser>} A promise that resolves to the embed user.
     */
    get(id: string): Promise<EmbedUser>;
    /**
     * Deletes an embed user by ID.
     * @param {string} id - The ID of the embed user.
     * @returns {Promise<{ success: boolean }>} A promise that resolves to an object indicating success.
     */
    delete(id: string): Promise<{
        success: boolean;
    }>;
    /**
     * Creates or updates an embed user.
     * @param {string} userId - The ID of the embed user.
     * @param {Object} userData - The data for the embed user.
     * @param {string} userData.name - The name of the embed user.
     * @param {string} userData.email - The email of the embed user.
     * @param {Object} [userData.metadata] - Additional metadata for the embed user.
     * @returns {Promise<EmbedUser>} A promise that resolves to the created or updated embed user.
     */
    upsert(userId: string, userData: {
        name: string;
        email: string;
        metadata?: {
            [key: string]: any;
        };
    }): Promise<EmbedUser>;
}

declare class OnvoDatasources extends OnvoBase {
    /**
     * Lists all the datasources.
     * @returns {Promise<DataSource[]>} A promise that resolves to an array of datasources.
     */
    list(): Promise<DataSource[]>;
    /**
     * Gets a datasource by ID.
     * @param {string} id - The ID of the datasource.
     * @returns {Promise<DataSource>} A promise that resolves to the datasource.
     */
    get(id: string): Promise<DataSource>;
    /**
     * Deletes a datasource by ID.
     * @param {string} id - The ID of the datasource.
     * @returns {Promise<{ success: boolean }>} A promise that resolves to an object indicating the success of the deletion.
     */
    delete(id: string): Promise<{
        success: boolean;
    }>;
    /**
     * Updates a datasource by ID.
     * @param {string} id - The ID of the datasource.
     * @param {Partial<DataSource>} body - The updated datasource object.
     * @returns {Promise<DataSource>} A promise that resolves to the updated datasource.
     */
    update(id: string, body: Partial<DataSource>): Promise<DataSource>;
    /**
     * Creates a new datasource.
     * @param {Omit<DataSource, "id" | "created_at" | "created_by" | "last_updated_at" | "last_updated_by" | "sample_data" | "size" | "team">} body - The new datasource object.
     * @returns {Promise<DataSource>} A promise that resolves to the created datasource.
     */
    create(body: Omit<DataSource, "id" | "created_at" | "created_by" | "last_updated_at" | "last_updated_by" | "sample_data" | "size" | "team">): Promise<DataSource>;
}

declare class OnvoAutomations extends OnvoBase {
    /**
     * Fetches all the automations
     * @returns {Promise<Automation[]>} A promise that resolves to an array of Automation objects
     */
    list(): Promise<Automation[]>;
    /**
     * Fetches an automation by its ID
     * @param {string} id - The ID of the automation
     * @returns {Promise<Automation>} A promise that resolves to an Automation object
     */
    get(id: string): Promise<Automation>;
    /**
     * Deletes an automation by its ID
     * @param {string} id - The ID of the automation
     * @returns {Promise<{ success: boolean }>} A promise that resolves to an object with a success field
     */
    delete(id: string): Promise<{
        success: boolean;
    }>;
    /**
     * Updates an automation by its ID
     * @param {string} id - The ID of the automation
     * @param {Partial<Automation>} body - The updated automation data
     * @returns {Promise<Automation>} A promise that resolves to an Automation object
     */
    update(id: string, body: Partial<Automation>): Promise<Automation>;
    /**
     * Creates a new automation
     * @param {Partial<Automation>} body - The automation data
     * @returns {Promise<Automation>} A promise that resolves to an Automation object
     */
    create(body: Partial<Automation>): Promise<Automation>;
}

declare class OnvoDashboards extends OnvoBase {
    /**
     * Lists all the dashboards.
     *
     * @return {Promise<Dashboard[]>} A promise that resolves to an array of dashboards.
     */
    list(): Promise<Dashboard[]>;
    /**
     * Gets a dashboard by ID.
     *
     * @param {string} id - The ID of the dashboard.
     * @return {Promise<Dashboard>} A promise that resolves to the dashboard.
     */
    get(id: string): Promise<Dashboard>;
    /**
     * Deletes a dashboard by ID.
     *
     * @param {string} id - The ID of the dashboard.
     * @return {Promise<{ success: true }>} A promise that resolves to an object indicating the success of the deletion.
     */
    delete(id: string): Promise<{
        success: true;
    }>;
    /**
     * Updates a dashboard by ID.
     *
     * @param {string} id - The ID of the dashboard.
     * @param {Partial<Dashboard>} body - The updated dashboard data.
     * @return {Promise<Dashboard>} A promise that resolves to the updated dashboard.
     */
    update(id: string, body: Partial<Dashboard>): Promise<Dashboard>;
    /**
     * Creates a new dashboard.
     *
     * @param {Omit<Dashboard, "id" | "created_at" | "created_by" | "last_updated_at" | "last_updated_by" | "thumbnail" | "team">} body - The dashboard data.
     * @return {Promise<Dashboard>} A promise that resolves to the created dashboard.
     */
    create(body: Omit<Dashboard, "id" | "created_at" | "created_by" | "last_updated_at" | "last_updated_by" | "thumbnail" | "team">): Promise<Dashboard>;
}

declare class OnvoDashboardDatasources extends OnvoBase {
    #private;
    constructor(dashboardId: string, apiKey: string, options?: {
        endpoint: string;
    });
    /**
     * Lists all the datasources linked to a dashboard.
     *
     * @return {Promise<DashboardDatasource[]>} A promise that resolves to an array of dashboard datasources.
     */
    list(): Promise<DashboardDatasource[]>;
    /**
     * Unlinks a datasource from a dashboard.
     *
     * @param {string} datasourceId - The ID of the datasource to unlink.
     * @return {Promise<{ success: boolean }>} A promise that resolves to an object indicating the success of the unlink operation.
     */
    unlink(datasourceId: string): Promise<{
        success: boolean;
    }>;
    /**
     * Links a datasource to a dashboard.
     *
     * @param {string} datasourceId - The ID of the datasource to link.
     * @return {Promise<DashboardDatasource>} A promise that resolves to the linked dashboard datasource.
     */
    link(datasourceId: string): Promise<DashboardDatasource>;
}

declare class OnvoDashboard extends OnvoBase {
    #private;
    datasources: OnvoDashboardDatasources;
    constructor(id: string, apiKey: string, options?: {
        endpoint: string;
    });
    /**
     * Updates the widget cache for the dashboard.
     *
     * @return {Promise<Widget[]>} A promise that resolves to an array of widgets.
     */
    updateWidgetCache(): Promise<Widget[]>;
    /**
     * Retrieves widget suggestions for the dashboard.
     *
     * @return {Promise<string[]>} A promise that resolves to an array of widget suggestions.
     */
    getWidgetSuggestions(): Promise<string[]>;
    /**
     * Exports the dashboard in the specified format.
     *
     * @param {("csv" | "xlsx" | "pdf" | "png" | "jpeg")} format - The format to export the dashboard in.
     * @return {Promise<Blob>} A promise that resolves to a Blob representing the exported dashboard.
     */
    export(format: "csv" | "xlsx" | "pdf" | "png" | "jpeg"): Promise<Blob>;
}

declare class OnvoEmbedUser extends OnvoBase {
    #private;
    constructor(id: string, apiKey: string, options?: {
        endpoint: string;
    });
    /**
     * Retrieves an access token for the embed user.
     *
     * @return {Promise<{ user: string; token: string }>} A promise that resolves to an object containing the user ID and the access token.
     */
    getAccessToken(): Promise<{
        user: string;
        token: string;
    }>;
}

declare class OnvoDatasource extends OnvoBase {
    #private;
    constructor(id: string, apiKey: string, options?: {
        endpoint: string;
    });
    /**
     * Initializes the data source.
     * @returns {Promise<DataSource>} A promise that resolves to the data source object.
     */
    initialize(): Promise<DataSource>;
    /**
     * Uploads a file to the data source.
     * @param {File} file - The file to upload.
     * @returns {Promise<DataSource>} A promise that resolves to the data source object.
     */
    uploadFile(file: File): Promise<DataSource>;
}

declare class OnvoQuestions extends OnvoBase {
    /**
     * Lists all questions for a given dashboard.
     *
     * @param {Object} filters - The filters to apply to the question list.
     * @param {string} filters.dashboard - The ID of the dashboard to list questions for.
     * @returns {Promise<Question[]>} A promise that resolves to an array of questions.
     */
    list(filters: {
        dashboard: string;
    }): Promise<Question[]>;
    /**
     * Creates a new question.
     *
     * @param {Object} payload - The payload for the question creation.
     * @param {Array<Object>} payload.messages - The messages to include in the question.
     * @param {string} payload.dashboardId - The ID of the dashboard to create the question in.
     * @param {string} [payload.questionId] - The ID of the question to update (optional).
     * @returns {Promise<Question>} A promise that resolves to the created question.
     */
    create(payload: {
        messages: {
            role: "user" | "assistant";
            content: string;
        }[];
        dashboardId: string;
        questionId?: string;
    }): Promise<Question>;
    /**
     * Deletes a question.
     *
     * @param {string} id - The ID of the question to delete.
     * @returns {Promise<{ success: boolean }>} A promise that resolves to an object indicating success.
     */
    delete(id: string): Promise<{
        success: boolean;
    }>;
    /**
     * Updates a question.
     *
     * @param {string} id - The ID of the question to update.
     * @param {Partial<Question>} body - The updated question data.
     * @returns {Promise<Question>} A promise that resolves to the updated question.
     */
    update(id: string, body: Partial<Question>): Promise<Question>;
}

declare class OnvoAutomation extends OnvoBase {
    #private;
    constructor(id: string, apiKey: string, options?: {
        endpoint: string;
    });
    /**
     * Fetches all the runs of the automation
     * @returns {Promise<AutomationRun[]>} A promise that resolves to an array of AutomationRun objects
     */
    getRuns(): Promise<AutomationRun[]>;
}

declare class OnvoWidget extends OnvoBase {
    #private;
    constructor(id: string, apiKey: string, options?: {
        endpoint: string;
    });
    /**
     * Exports the widget in the specified format.
     *
     * @param {("svg" | "csv" | "xlsx" | "png" | "jpeg")} format - The format to export the widget in.
     * @return {Promise<Blob>} A promise that resolves to a Blob representing the exported widget.
     */
    export(format: "svg" | "csv" | "xlsx" | "png" | "jpeg"): Promise<Blob>;
    /**
     * Updates the prompts for the widget.
     *
     * @param {Array<{ role: "user" | "assistant"; content: String }>} messages - The new prompts for the widget.
     * @return {Promise<Widget>} A promise that resolves to the updated widget.
     */
    updatePrompts(messages: {
        role: "user" | "assistant";
        content: String;
    }[]): Promise<Widget>;
    /**
     * Executes the given code in the widget.
     *
     * @param {string} code - The code to execute in the widget.
     * @return {Promise<any>} A promise that resolves to the result of executing the code.
     */
    executeCode(code: string): Promise<any>;
}

declare class OnvoSessions extends OnvoBase {
    /**
     * Lists all sessions for a given dashboard
     * @param filters - Object containing the parent_dashboard field
     * @returns Promise of an array of Session objects
     */
    list(filters: {
        parent_dashboard: string;
    }): Promise<Session[]>;
    /**
     * Gets a specific session by its dashboard id
     * @param filters - Object containing the dashboard field
     * @returns Promise of a Session object
     */
    get(filters: {
        dashboard: string;
    }): Promise<Session>;
    /**
     * Revokes a session by its dashboard id
     * @param filters - Object containing the dashboard field
     * @returns Promise of an object with a success field
     */
    revoke(filters: {
        dashboard: string;
    }): Promise<{
        success: true;
    }>;
    /**
     * Revokes all sessions for a given dashboard
     * @param filters - Object containing the parent_dashboard field
     * @returns Promise of an object with a success field
     */
    revokeAll(filters: {
        parent_dashboard: string;
    }): Promise<{
        success: true;
    }>;
    /**
     * Creates or updates a session for a given embed_user
     * @param filters - Object containing the embed_user, parent_dashboard and parameters fields
     * @returns Promise of a Session object with additional url and token fields
     */
    upsert({ embed_user, parent_dashboard, parameters, }: {
        embed_user: string;
        parent_dashboard: string;
        parameters?: {
            [key: string]: any;
        };
    }): Promise<Session & {
        url: string;
        token: string;
    }>;
}

declare class OnvoWidgets extends OnvoBase {
    /**
     * Retrieves a list of widgets for a given dashboard.
     *
     * @param {Object} filters - Filters for the widgets.
     * @param {string} filters.dashboard - The ID of the dashboard to retrieve widgets for.
     * @return {Promise<Widget[]>} A promise that resolves to an array of widgets.
     */
    list(filters: {
        dashboard: string;
    }): Promise<Widget[]>;
    /**
     * Retrieves a specific widget by its ID.
     *
     * @param {string} id - The ID of the widget to retrieve.
     * @return {Promise<Widget>} A promise that resolves to the widget.
     */
    get(id: string): Promise<Widget>;
    /**
     * Deletes a widget by its ID.
     *
     * @param {string} id - The ID of the widget to delete.
     * @return {Promise<{success: boolean}>} A promise that resolves to an object indicating success.
     */
    delete(id: string): Promise<{
        success: boolean;
    }>;
    /**
     * Updates a widget by its ID.
     *
     * @param {string} id - The ID of the widget to update.
     * @param {Partial<Widget>} body - The updated widget data.
     * @return {Promise<Widget>} A promise that resolves to the updated widget.
     */
    update(id: string, body: Partial<Widget>): Promise<Widget>;
    /**
     * Creates a new widget.
     *
     * @param {Omit<Widget, "id" | "created_at">} body - The widget data to create.
     * @return {Promise<Widget>} A promise that resolves to the created widget.
     */
    create(body: Omit<Widget, "id" | "created_at">): Promise<Widget>;
}

declare class OnvoQuestion extends OnvoBase {
    #private;
    constructor(id: string, apiKey: string, options?: {
        endpoint: string;
    });
    /**
     * Exports the question in the specified format.
     *
     * @param {number} messageIndex - The index of the message to export.
     * @param {("svg" | "csv" | "xlsx" | "png" | "jpeg")} format - The format to export the question in.
     * @return {Promise<Blob>} A promise that resolves to a Blob representing the exported question.
     */
    export(messageIndex: number, format: "svg" | "csv" | "xlsx" | "png" | "jpeg"): Promise<Blob>;
}

declare class Onvo extends OnvoBase {
    accounts: OnvoAccounts;
    teams: OnvoTeams;
    embed_users: OnvoEmbedUsers;
    datasources: OnvoDatasources;
    automations: OnvoAutomations;
    dashboards: OnvoDashboards;
    questions: OnvoQuestions;
    widgets: OnvoWidgets;
    sessions: OnvoSessions;
    automation: (automationId: string) => OnvoAutomation;
    dashboard: (dashboardId: string) => OnvoDashboard;
    embed_user: (embedUserId: string) => OnvoEmbedUser;
    datasource: (datasourceId: string) => OnvoDatasource;
    widget: (widgetId: string) => OnvoWidget;
    question: (questionId: string) => OnvoQuestion;
    constructor(apiKey: string, options?: {
        endpoint: string;
    });
}

export { type APIDatasourceConfig, type APIKey, type Account, type AirtableDatasourceConfig, type Automation, type AutomationRun, type ComprehensiveDashboard, type Dashboard, type DashboardDatasource, type DataSource, type Database, type EmbedUser, type Enums, type FileDatasourceConfig, type FirestoreDatasourceConfig, type GoogleSheetDatasourceConfig, type Integration, type Invite, type Json, type Log, type Member, type Modify, type MongoDBDatasourceConfig, type OauthConfig, Onvo, type PostgreSQLDatasourceConfig, type Question, type RedshiftDatasourceConfig, type RootfiDatasourceConfig, type SQLDatasourceConfig, type Session, type Settings, type Subscription, type SubscriptionPlan, Table, type Tables, type TablesInsert, type TablesUpdate, type Team, type Widget, type ZohoDatasourceConfig, Onvo as default };
