export interface NotificationConfig {
  email?: {
    enabled: boolean;
    recipients: string[];
    from: string;
  };
  webhook?: {
    enabled: boolean;
    url: string;
    secret: string;
  };
  slack?: {
    enabled: boolean;
    webhookUrl: string;
    channel: string;
  };
}

export interface NotificationMessage {
  type: 'warning' | 'info' | 'alert';
  tenant: string;
  message: string;
  details: any;
  timestamp?: Date;
}
