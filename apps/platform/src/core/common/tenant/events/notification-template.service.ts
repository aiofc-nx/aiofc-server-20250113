import { Injectable } from '@nestjs/common';
import {
  HtmlTemplate,
  TemplateData,
  EmailTheme,
  NotificationTemplate,
} from './notification-template.interface';
import { NotificationTemplateCache } from './notification-template.cache';

@Injectable()
export class NotificationTemplateService {
  constructor(private readonly cache: NotificationTemplateCache) {}

  readonly defaultTheme: EmailTheme = {
    primaryColor: '#007bff',
    secondaryColor: '#6c757d',
    fontFamily: 'Arial, sans-serif',
  };

  private readonly templates: Record<
    string,
    (data: TemplateData) => NotificationTemplate
  > = {
    'resource.warning': (data) => ({
      subject: `Resource Warning - ${data.tenant.name}`,
      body: `Resource warning: ${data.data.type} at ${data.data.current}/${data.data.limit}`,
      variables: data,
    }),
    'config.changed': (data) => ({
      subject: `Config Changed - ${data.tenant.name}`,
      body: `Configuration updated for tenant ${data.tenant.name}`,
      variables: data,
    }),
  };

  private htmlTemplates: Record<
    string,
    (data: TemplateData, theme: EmailTheme) => HtmlTemplate
  > = {
    'resource.warning': (data, theme) => ({
      subject: `Resource Warning - ${data.tenant.name}`,
      body: this.getPlainText('resource.warning', data),
      html: this.getHtmlTemplate('resource.warning', data, theme),
      plainText: this.getPlainText('resource.warning', data),
      variables: data,
    }),

    'config.changed': (data, theme) => ({
      subject: `Configuration Updated - ${data.tenant.name}`,
      body: this.getPlainText('config.changed', data),
      html: this.getHtmlTemplate('config.changed', data, theme),
      plainText: this.getPlainText('config.changed', data),
      variables: data,
    }),
  };

  getHtmlTemplate(type: string, data: TemplateData, theme: EmailTheme): string {
    const baseTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: ${theme.fontFamily};
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: ${theme.primaryColor};
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 5px 5px 0 0;
            }
            .content {
              padding: 20px;
              background: #fff;
              border: 1px solid #ddd;
              border-radius: 0 0 5px 5px;
            }
            .footer {
              text-align: center;
              padding: 20px;
              color: ${theme.secondaryColor};
              font-size: 0.8em;
            }
          </style>
        </head>
        <body>
          <div class="header">
            ${theme.logoUrl ? `<img src="${theme.logoUrl}" alt="Logo" style="max-height: 50px;">` : ''}
            <h1>${data.tenant.name}</h1>
          </div>
          <div class="content">
            ${this.getContentByType(type, data)}
          </div>
          <div class="footer">
            Generated at ${data.event.timestamp.toLocaleString()}
          </div>
        </body>
      </html>
    `;

    return this.replaceVariables(baseTemplate, data);
  }

  private getContentByType(type: string, data: TemplateData): string {
    switch (type) {
      case 'resource.warning':
        return `
          <h2>Resource Usage Warning</h2>
          <p>A resource usage warning has been triggered for your tenant.</p>
          <div style="background: #fff3cd; padding: 15px; border-radius: 5px;">
            <strong>Resource:</strong> ${data.data.type}<br>
            <strong>Current Usage:</strong> ${data.data.current}<br>
            <strong>Limit:</strong> ${data.data.limit}
          </div>
        `;

      case 'config.changed':
        return `
          <h2>Configuration Updated</h2>
          <p>Your tenant configuration has been updated.</p>
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px;">
            <h3>Previous Configuration:</h3>
            <pre>${JSON.stringify(data.data.oldConfig, null, 2)}</pre>
            <h3>New Configuration:</h3>
            <pre>${JSON.stringify(data.data.newConfig, null, 2)}</pre>
          </div>
        `;

      default:
        return '<p>No content available for this notification type.</p>';
    }
  }

  private getPlainText(type: string, data: TemplateData): string {
    // 简单的纯文本版本
    return this.templates[type]?.(data).body || 'No content available';
  }

  private replaceVariables(template: string, data: TemplateData): string {
    let result = template;
    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === 'object') {
        Object.entries(value).forEach(([subKey, subValue]) => {
          result = result.replace(
            new RegExp(`{{${key}.${subKey}}}`, 'g'),
            String(subValue),
          );
        });
      } else {
        result = result.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
      }
    });
    return result;
  }

  getTemplate(type: string, data: TemplateData): NotificationTemplate {
    const cacheKey = this.cache.generateKey(type, data);
    const cached = this.cache.get(cacheKey);
    if (cached) {
      return cached;
    }

    const template = this.generateTemplate(type, data);
    this.cache.set(cacheKey, template);
    return template;
  }

  private generateTemplate(
    type: string,
    data: TemplateData,
  ): NotificationTemplate {
    const templateFn = this.templates[type];
    if (!templateFn) {
      throw new Error(`Template not found: ${type}`);
    }
    return templateFn(data);
  }

  renderTemplate(template: NotificationTemplate): string {
    let rendered = template.body;
    Object.entries(template.variables).forEach(([key, value]) => {
      rendered = rendered.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
    });
    return rendered;
  }
}
