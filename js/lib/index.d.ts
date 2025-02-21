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
type Database = {
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
                Relationships: [];
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
                        foreignKeyName: "public_api_keys_team_fkey";
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
                        foreignKeyName: "public_automation_runs_team_fkey";
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
                    dashboard: string;
                    description: string | null;
                    email_body: string;
                    email_cc: string[] | null;
                    email_subject: string;
                    email_to: string | null;
                    enabled: boolean;
                    id: string;
                    last_run_at: string | null;
                    last_updated_at: string;
                    method: string;
                    next_run_at: string | null;
                    output_format: string;
                    schedule: string;
                    team: string;
                    timezone: string;
                    title: string;
                };
                Insert: {
                    created_at?: string;
                    dashboard: string;
                    description?: string | null;
                    email_body: string;
                    email_cc?: string[] | null;
                    email_subject: string;
                    email_to?: string | null;
                    enabled?: boolean;
                    id?: string;
                    last_run_at?: string | null;
                    last_updated_at?: string;
                    method: string;
                    next_run_at?: string | null;
                    output_format: string;
                    schedule: string;
                    team: string;
                    timezone?: string;
                    title: string;
                };
                Update: {
                    created_at?: string;
                    dashboard?: string;
                    description?: string | null;
                    email_body?: string;
                    email_cc?: string[] | null;
                    email_subject?: string;
                    email_to?: string | null;
                    enabled?: boolean;
                    id?: string;
                    last_run_at?: string | null;
                    last_updated_at?: string;
                    method?: string;
                    next_run_at?: string | null;
                    output_format?: string;
                    schedule?: string;
                    team?: string;
                    timezone?: string;
                    title?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "automations_dashboard_fkey";
                        columns: ["dashboard"];
                        isOneToOne: false;
                        referencedRelation: "dashboards";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "public_automations_team_fkey";
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
                        foreignKeyName: "public_dashboard_datasources_team_fkey";
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
                        foreignKeyName: "public_dashboards_team_fkey";
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
                    config: Json | null;
                    created_at: string;
                    created_by: string | null;
                    description: string | null;
                    filters: Json;
                    id: string;
                    last_updated_at: string;
                    last_updated_by: string | null;
                    parameters: Json | null;
                    sample_data: Json | null;
                    size: number;
                    source: string;
                    team: string;
                    title: string;
                };
                Insert: {
                    columns?: Json | null;
                    config?: Json | null;
                    created_at?: string;
                    created_by?: string | null;
                    description?: string | null;
                    filters?: Json;
                    id?: string;
                    last_updated_at?: string;
                    last_updated_by?: string | null;
                    parameters?: Json | null;
                    sample_data?: Json | null;
                    size?: number;
                    source: string;
                    team: string;
                    title: string;
                };
                Update: {
                    columns?: Json | null;
                    config?: Json | null;
                    created_at?: string;
                    created_by?: string | null;
                    description?: string | null;
                    filters?: Json;
                    id?: string;
                    last_updated_at?: string;
                    last_updated_by?: string | null;
                    parameters?: Json | null;
                    sample_data?: Json | null;
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
                        foreignKeyName: "public_datasources_team_fkey";
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
                        foreignKeyName: "public_embed_users_team_fkey";
                        columns: ["team"];
                        isOneToOne: false;
                        referencedRelation: "teams";
                        referencedColumns: ["id"];
                    }
                ];
            };
            integrations: {
                Row: {
                    config: Json;
                    created_at: string;
                    provider: string;
                    status: string;
                    team: string;
                };
                Insert: {
                    config?: Json;
                    created_at?: string;
                    provider: string;
                    status?: string;
                    team: string;
                };
                Update: {
                    config?: Json;
                    created_at?: string;
                    provider?: string;
                    status?: string;
                    team?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "public_integrations_team_fkey";
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
                        foreignKeyName: "public_invites_team_fkey";
                        columns: ["team"];
                        isOneToOne: false;
                        referencedRelation: "teams";
                        referencedColumns: ["id"];
                    }
                ];
            };
            llm_settings: {
                Row: {
                    analyst_agent_model: string;
                    analyst_agent_provider: string;
                    analyst_agent_type: Database["public"]["Enums"]["LLM hosting type"];
                    anthropic_api_key: string | null;
                    google_api_key: string | null;
                    groq_api_key: string | null;
                    ollama_api_url: string | null;
                    openai_api_key: string | null;
                    programmer_agent_model: string;
                    programmer_agent_prompt: string | null;
                    programmer_agent_provider: string;
                    programmer_agent_type: Database["public"]["Enums"]["LLM hosting type"];
                    team: string;
                    updated: boolean;
                };
                Insert: {
                    analyst_agent_model?: string;
                    analyst_agent_provider?: string;
                    analyst_agent_type?: Database["public"]["Enums"]["LLM hosting type"];
                    anthropic_api_key?: string | null;
                    google_api_key?: string | null;
                    groq_api_key?: string | null;
                    ollama_api_url?: string | null;
                    openai_api_key?: string | null;
                    programmer_agent_model?: string;
                    programmer_agent_prompt?: string | null;
                    programmer_agent_provider?: string;
                    programmer_agent_type?: Database["public"]["Enums"]["LLM hosting type"];
                    team: string;
                    updated?: boolean;
                };
                Update: {
                    analyst_agent_model?: string;
                    analyst_agent_provider?: string;
                    analyst_agent_type?: Database["public"]["Enums"]["LLM hosting type"];
                    anthropic_api_key?: string | null;
                    google_api_key?: string | null;
                    groq_api_key?: string | null;
                    ollama_api_url?: string | null;
                    openai_api_key?: string | null;
                    programmer_agent_model?: string;
                    programmer_agent_prompt?: string | null;
                    programmer_agent_provider?: string;
                    programmer_agent_type?: Database["public"]["Enums"]["LLM hosting type"];
                    team?: string;
                    updated?: boolean;
                };
                Relationships: [
                    {
                        foreignKeyName: "public_llm_settings_team_fkey";
                        columns: ["team"];
                        isOneToOne: true;
                        referencedRelation: "teams";
                        referencedColumns: ["id"];
                    }
                ];
            };
            logs: {
                Row: {
                    account: string | null;
                    created_at: string;
                    dashboard: string | null;
                    embed_user: string | null;
                    id: string;
                    team: string | null;
                    type: string;
                    widget: string | null;
                };
                Insert: {
                    account?: string | null;
                    created_at?: string;
                    dashboard?: string | null;
                    embed_user?: string | null;
                    id?: string;
                    team?: string | null;
                    type: string;
                    widget?: string | null;
                };
                Update: {
                    account?: string | null;
                    created_at?: string;
                    dashboard?: string | null;
                    embed_user?: string | null;
                    id?: string;
                    team?: string | null;
                    type?: string;
                    widget?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "public_logs_account_fkey";
                        columns: ["account"];
                        isOneToOne: false;
                        referencedRelation: "accounts";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "public_logs_dashboard_fkey";
                        columns: ["dashboard"];
                        isOneToOne: false;
                        referencedRelation: "dashboards";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "public_logs_embed_user_team_fkey";
                        columns: ["embed_user", "team"];
                        isOneToOne: false;
                        referencedRelation: "embed_users";
                        referencedColumns: ["id", "team"];
                    },
                    {
                        foreignKeyName: "public_logs_team_fkey";
                        columns: ["team"];
                        isOneToOne: false;
                        referencedRelation: "teams";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "public_logs_widget_fkey";
                        columns: ["widget"];
                        isOneToOne: false;
                        referencedRelation: "widgets";
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
                        foreignKeyName: "members_user_fkey";
                        columns: ["account"];
                        isOneToOne: false;
                        referencedRelation: "accounts";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "public_members_team_fkey";
                        columns: ["team"];
                        isOneToOne: false;
                        referencedRelation: "teams";
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
                        foreignKeyName: "public_questions_team_fkey";
                        columns: ["team"];
                        isOneToOne: false;
                        referencedRelation: "teams";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "questions_dashboard_fkey";
                        columns: ["dashboard"];
                        isOneToOne: false;
                        referencedRelation: "dashboards";
                        referencedColumns: ["id"];
                    }
                ];
            };
            sessions: {
                Row: {
                    created_at: string;
                    dashboard: string;
                    embed_user: string;
                    parameters: Json;
                    team: string;
                };
                Insert: {
                    created_at?: string;
                    dashboard: string;
                    embed_user: string;
                    parameters?: Json;
                    team: string;
                };
                Update: {
                    created_at?: string;
                    dashboard?: string;
                    embed_user?: string;
                    parameters?: Json;
                    team?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "public_sessions_embed_user_team_fkey";
                        columns: ["embed_user", "team"];
                        isOneToOne: false;
                        referencedRelation: "embed_users";
                        referencedColumns: ["id", "team"];
                    },
                    {
                        foreignKeyName: "public_sessions_team_fkey";
                        columns: ["team"];
                        isOneToOne: false;
                        referencedRelation: "teams";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "sessions_dashboard_fkey";
                        columns: ["dashboard"];
                        isOneToOne: false;
                        referencedRelation: "dashboards";
                        referencedColumns: ["id"];
                    }
                ];
            };
            subscription_plans: {
                Row: {
                    accounts: number | null;
                    automations: boolean;
                    connected_datasources: number;
                    copilot: boolean;
                    custom_llm: boolean;
                    embed_users: number;
                    name: string;
                };
                Insert: {
                    accounts?: number | null;
                    automations?: boolean;
                    connected_datasources?: number;
                    copilot?: boolean;
                    custom_llm?: boolean;
                    embed_users?: number;
                    name: string;
                };
                Update: {
                    accounts?: number | null;
                    automations?: boolean;
                    connected_datasources?: number;
                    copilot?: boolean;
                    custom_llm?: boolean;
                    embed_users?: number;
                    name?: string;
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
                        foreignKeyName: "public_subscriptions_team_fkey";
                        columns: ["team"];
                        isOneToOne: true;
                        referencedRelation: "teams";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "subscriptions_product_name_fkey";
                        columns: ["product_name"];
                        isOneToOne: false;
                        referencedRelation: "subscription_plans";
                        referencedColumns: ["name"];
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
                    cache: Json | null;
                    code: string;
                    created_at: string;
                    dashboard: string;
                    id: string;
                    layouts: Json;
                    messages: Json;
                    settings: Json;
                    team: string;
                    title: string;
                    use_in_library: boolean | null;
                };
                Insert: {
                    cache?: Json | null;
                    code: string;
                    created_at?: string;
                    dashboard: string;
                    id?: string;
                    layouts?: Json;
                    messages?: Json;
                    settings?: Json;
                    team: string;
                    title: string;
                    use_in_library?: boolean | null;
                };
                Update: {
                    cache?: Json | null;
                    code?: string;
                    created_at?: string;
                    dashboard?: string;
                    id?: string;
                    layouts?: Json;
                    messages?: Json;
                    settings?: Json;
                    team?: string;
                    title?: string;
                    use_in_library?: boolean | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "public_widgets_team_fkey";
                        columns: ["team"];
                        isOneToOne: false;
                        referencedRelation: "teams";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "widgets_dashboard_fkey";
                        columns: ["dashboard"];
                        isOneToOne: false;
                        referencedRelation: "dashboards";
                        referencedColumns: ["id"];
                    }
                ];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
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
                Returns: string[];
            };
            stripe_can_create_automation: {
                Args: {
                    organisation: string;
                };
                Returns: boolean;
            };
            stripe_can_create_dashboard_datasource: {
                Args: {
                    organisation: string;
                    dashboard_id: string;
                };
                Returns: boolean;
            };
            stripe_can_create_embed_user: {
                Args: {
                    organisation: string;
                };
                Returns: boolean;
            };
            stripe_can_create_invite: {
                Args: {
                    organisation: string;
                };
                Returns: boolean;
            };
            stripe_can_create_llm_settings: {
                Args: {
                    organisation: string;
                };
                Returns: boolean;
            };
            stripe_can_read_dashboard: {
                Args: {
                    organisation: string;
                };
                Returns: boolean;
            };
        };
        Enums: {
            "LLM hosting type": "onvo-hosted" | "self-hosted";
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
};
type PublicSchema = Database[Extract<keyof Database, "public">];
type Tables<PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"]) | {
    schema: keyof Database;
}, TableName extends PublicTableNameOrOptions extends {
    schema: keyof Database;
} ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] & Database[PublicTableNameOrOptions["schema"]]["Views"]) : never = never> = PublicTableNameOrOptions extends {
    schema: keyof Database;
} ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] & Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
    Row: infer R;
} ? R : never : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"]) ? (PublicSchema["Tables"] & PublicSchema["Views"])[PublicTableNameOrOptions] extends {
    Row: infer R;
} ? R : never : never;
type TablesInsert<PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | {
    schema: keyof Database;
}, TableName extends PublicTableNameOrOptions extends {
    schema: keyof Database;
} ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"] : never = never> = PublicTableNameOrOptions extends {
    schema: keyof Database;
} ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Insert: infer I;
} ? I : never : PublicTableNameOrOptions extends keyof PublicSchema["Tables"] ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
    Insert: infer I;
} ? I : never : never;
type TablesUpdate<PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | {
    schema: keyof Database;
}, TableName extends PublicTableNameOrOptions extends {
    schema: keyof Database;
} ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"] : never = never> = PublicTableNameOrOptions extends {
    schema: keyof Database;
} ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Update: infer U;
} ? U : never : PublicTableNameOrOptions extends keyof PublicSchema["Tables"] ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
    Update: infer U;
} ? U : never : never;
type Enums<PublicEnumNameOrOptions extends keyof PublicSchema["Enums"] | {
    schema: keyof Database;
}, EnumName extends PublicEnumNameOrOptions extends {
    schema: keyof Database;
} ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"] : never = never> = PublicEnumNameOrOptions extends {
    schema: keyof Database;
} ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName] : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"] ? PublicSchema["Enums"][PublicEnumNameOrOptions] : never;
type CompositeTypes<PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"] | {
    schema: keyof Database;
}, CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
} ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"] : never = never> = PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
} ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName] : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"] ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions] : never;

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

type DashboardSettings = {
    filters: boolean;
    cache_refresh_interval?: number;
    theme: "dark" | "light" | "auto";
    font: string;
    dark_background: string;
    dark_foreground: string;
    dark_text: string;
    light_background: string;
    light_foreground: string;
    light_text: string;
    hide_header: boolean;
    grid_spacing: number;
    custom_css: string;
    copilot_title: string;
    copilot_description: string;
    help_url?: string;
    enable_advanced_widget_creator?: boolean;
    enable_widget_insights?: boolean;
    can_ask_questions: boolean;
    can_edit_widgets: boolean;
    can_edit_widget_layout: boolean;
    can_create_widgets: boolean;
    can_delete_widgets: boolean;
    can_schedule_reports?: boolean;
    can_edit_widget_code?: boolean;
    disable_download_images: boolean;
    disable_download_reports: boolean;
    disable_download_documents: boolean;
    pdf_orientation?: "portrait" | "landscape";
};
type WidgetSettings = {
    css_id?: string;
    css_classnames?: string;
};
interface DatasourceFilter {
    column: string;
    type: 'text' | 'number' | 'date';
    label: string;
}
type DashboardFilter = {
    label: string;
    type: "text";
    options: string[];
    values: string[];
} | {
    label: string;
    type: "number";
    options: [number, number];
    values: [number, number];
} | {
    label: string;
    type: "date";
    options: [string, string];
    values: [string, string];
};
type WidgetMessage = {
    role: "user" | "assistant";
    content: string;
};
interface DashboardMeta {
    created_by: Account;
    last_updated_by?: Account;
    widgets: number;
    datasources: number;
}
type Invite = Database["public"]["Tables"]["invites"]["Row"];
type Member = Database["public"]["Tables"]["members"]["Row"];
type Team = Database["public"]["Tables"]["teams"]["Row"];
type Account = Database["public"]["Tables"]["accounts"]["Row"];
type DataSource = Modify<Database["public"]["Tables"]["datasources"]["Row"], {
    columns: {
        title: string;
        description: string;
    }[];
    sample_data: {
        [key: string]: any;
    }[];
    config: any;
    parameters: {
        id: string;
        wrap?: string;
        default: string;
    }[];
    filters: DatasourceFilter[];
}>;
type EmbedUser = Database["public"]["Tables"]["embed_users"]["Row"];
type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"];
type SubscriptionPlan = Database["public"]["Tables"]["subscription_plans"]["Row"];
type APIKey = Database["public"]["Tables"]["api_keys"]["Row"];
type Widget = Modify<Database["public"]["Tables"]["widgets"]["Row"], {
    settings?: WidgetSettings;
    messages: WidgetMessage[];
    layouts: {
        lg: {
            x: number;
            y: number;
            w: number;
            h: number;
        };
        sm?: {
            x: number;
            y: number;
            w: number;
            h: number;
        };
    };
    cache: any;
}>;
type Dashboard = Modify<Database["public"]["Tables"]["dashboards"]["Row"], {
    settings?: DashboardSettings;
    filters: DashboardFilter[];
}>;
type DashboardDatasource = Database["public"]["Tables"]["dashboard_datasources"]["Row"];
type Session = Modify<Database["public"]["Tables"]["sessions"]["Row"], {
    parameters: {
        [key: string]: any;
    };
}>;
type Question = Database["public"]["Tables"]["questions"]["Row"];
type Integration = Modify<Database["public"]["Tables"]["integrations"]["Row"], {
    config: any;
}>;
type Automation = Database["public"]["Tables"]["automations"]["Row"];
type AutomationRun = Database["public"]["Tables"]["automation_runs"]["Row"];
type LLMSettings = Database["public"]["Tables"]["llm_settings"]["Row"];
type Log = Database["public"]["Tables"]["logs"]["Row"];
declare enum LogType {
    ViewDashboard = "view-dashboard",
    EditDashboard = "edit-dashboard",
    CreateWidget = "create-widget",
    DeleteWidget = "delete-widget",
    EditWidget = "edit-widget"
}

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
    list(filters?: {
        dashboard: string;
    }): Promise<DataSource[]>;
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
    list(filters?: {
        dashboard: string;
    }): Promise<Automation[]>;
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
     * @return {Promise<(Dashboard & {_meta: DashboardMeta})[]>} A promise that resolves to an array of dashboards.
     */
    list(): Promise<(Dashboard & {
        _meta: DashboardMeta;
    })[]>;
    /**
     * Gets a dashboard by ID.
     *
     * @param {string} id - The ID of the dashboard.
     * @return {Promise<Dashboard>} A promise that resolves to the dashboard.
     */
    get(id: string): Promise<Dashboard & {
        _meta: DashboardMeta;
    }>;
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
    /**
     * Links a datasource to a dashboard.
     *
     * @param {array} datasourceIds - The IDs of the datasources to link.
     * @return {Promise<DashboardDatasource>} A promise that resolves to the linked dashboard datasource.
     */
    linkMultiple(datasourceIds: string[]): Promise<DashboardDatasource>;
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
     * Exports the dashboard in the specified format.
     *
     * @param {("csv" | "xlsx" | "pdf" | "png" | "jpeg")} format - The format to export the dashboard in.
     * @return {Promise<Blob>} A promise that resolves to a Blob representing the exported dashboard.
     */
    export(format: "csv" | "xlsx" | "pdf" | "png" | "jpeg" | "pptx", theme?: "light" | "dark"): Promise<Blob>;
    /**
     * Summarizes the dashboard using the provided prompt.
     *
     * @param {string} prompt - The prompt to use for summarizing the dashboard.
     * @return {Promise<{title: string, description: string}>} A promise that resolves to an object containing the title and description of the summarized dashboard.
     */
    summarize(prompt: string): Promise<{
        title: string;
        description: string;
    }>;
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
    export(format: "svg" | "csv" | "xlsx" | "png" | "jpeg", theme?: "light" | "dark"): Promise<Blob>;
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
        parent_dashboard?: string;
        embed_user?: string;
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
        use_in_library?: boolean;
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
    export(messageIndex: number, format: "svg" | "csv" | "xlsx" | "png" | "jpeg", theme?: "light" | "dark"): Promise<Blob>;
}

declare class OnvoUtils extends OnvoBase {
    /**
     * Uploads a file to a given bucket
     *
     * @param {Object} filters - The filters to apply to the question list.
     * @param {string} filters.dashboard - The ID of the dashboard to list questions for.
     * @returns {Promise<Question[]>} A promise that resolves to an array of questions.
     */
    uploadFile(file: File): Promise<{
        url: string;
    }>;
}

declare class OnvoLogs extends OnvoBase {
    /**
     * Lists all logs for a given dashboard.
     *
     * @returns {Promise<Log[]>} A promise that resolves to an array of logs.
     */
    list(): Promise<Log[]>;
    /**
     * Creates a new log.
     *
     * @param {Object} payload - The payload for the log creation.
     * @param {string} payload.type - The type of log to create.
     * @param {string} payload.dashboard - The ID of the dashboard to create the log for.
     * @param {string} payload.widget - The ID of the widget to create the log for.
     * @returns {Promise<Log>} A promise that resolves to the created log.
     */
    create(payload: {
        type: LogType;
        dashboard: string;
        widget?: string;
    }): Promise<Log>;
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
    utils: OnvoUtils;
    logs: OnvoLogs;
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

export { type APIKey, type Account, type Automation, type AutomationRun, type CompositeTypes, type Dashboard, type DashboardDatasource, type DashboardFilter, type DashboardMeta, type DashboardSettings, type DataSource, type Database, type DatasourceFilter, type EmbedUser, type Enums, type Integration, type Invite, type Json, type LLMSettings, type Log, LogType, type Member, type Modify, Onvo, type Question, type Session, type Subscription, type SubscriptionPlan, Table, type Tables, type TablesInsert, type TablesUpdate, type Team, type Widget, type WidgetMessage, type WidgetSettings, Onvo as default };
