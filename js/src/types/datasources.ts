export type OauthConfig = {
  access_token: string;
  refresh_token: string;
  access_expires_at: string;
  refresh_expires_at: string;
};
export type APIDatasourceConfig = {
  url?: string;
  type?: "json" | "csv" | "xml";
  method?: "GET" | "POST";
  headers?: string;
  body?: string;
  transform?: string;
};

export type CSVDatasourceConfig = {
  url?: string;
  filename?: string;
};

export type ExcelDatasourceConfig = {
  url?: string;
  filename?: string;
  sheetName?: string;
};

export type JSONDatasourceConfig = {
  url?: string;
  filename?: string;
  transform?: string;
};

export type RedshiftDatasourceConfig = {
  host: string;
  port: string;
  user: string;
  password: string;
  database: string;
  query: string;
};

export type MySQLDatasourceConfig = {
  host: string;
  user: string;
  port: string;
  password: string;
  database: string;
  query: string;
};

export type MsSQLDatasourceConfig = {
  server: string;
  port: string;
  user: string;
  password: string;
  database: string;
  query: string;
};

export type PostgreSQLDatasourceConfig = {
  host: string;
  port: string;
  database: string;
  user: string;
  password: string;
  query: string;
};

export type RootfiDatasourceConfig = {
  company_id: number;
  resource: string;
};

export type MongoDBDatasourceConfig = {
  url: string;
  database: string;
  collection: string;
};

export type AirtableDatasourceConfig = {
  baseId: string;
  baseName: string;
  tableId: string;
  tableName: string;
};

export type GoogleSheetDatasourceConfig = {
  docId: string;
  sheetId: number;
  sheetName: string;
};

export type ZohoDatasourceConfig = {
  product: string;
  module: string;
};

export type FirestoreDatasourceConfig = {
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
