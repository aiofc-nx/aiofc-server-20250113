export interface NotificationTemplate {
  subject: string;
  body: string;
  variables: Record<string, any>;
}

export interface TemplateData {
  tenant: {
    id: string;
    name: string;
  };
  event: {
    type: string;
    timestamp: Date;
  };
  data: Record<string, any>;
}

export interface HtmlTemplate extends NotificationTemplate {
  html: string;
  plainText: string;
}

export interface EmailTheme {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  logoUrl?: string;
}
