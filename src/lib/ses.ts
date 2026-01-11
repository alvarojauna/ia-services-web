import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { awsConfig } from './aws-config';

const region = process.env.APP_AWS_REGION || process.env.AWS_REGION || awsConfig.ses.region;

const clientConfig: ConstructorParameters<typeof SESClient>[0] = { region };

// Use custom credentials if available (for Amplify deployment)
if (process.env.APP_AWS_ACCESS_KEY_ID && process.env.APP_AWS_SECRET_ACCESS_KEY) {
  clientConfig.credentials = {
    accessKeyId: process.env.APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.APP_AWS_SECRET_ACCESS_KEY,
  };
}

const sesClient = new SESClient(clientConfig);

interface EmailParams {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({ to, subject, html, text }: EmailParams): Promise<void> {
  const toAddresses = Array.isArray(to) ? to : [to];

  const command = new SendEmailCommand({
    Source: awsConfig.ses.fromEmail,
    Destination: {
      ToAddresses: toAddresses,
    },
    Message: {
      Subject: { Data: subject },
      Body: {
        Html: { Data: html },
        ...(text && { Text: { Data: text } }),
      },
    },
  });

  await sesClient.send(command);
}

// Email templates
export const emailTemplates = {
  welcome: (name: string) => ({
    subject: 'Bienvenido a IA Services',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">¡Bienvenido, ${name}!</h1>
        <p>Gracias por registrarte en IA Services.</p>
        <p>Estamos emocionados de tenerte con nosotros.</p>
        <p>Saludos,<br>El equipo de IA Services</p>
      </div>
    `,
  }),

  purchaseConfirmation: (name: string, plan: string, amount: string) => ({
    subject: `Confirmación de compra - ${plan}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">¡Gracias por tu compra, ${name}!</h1>
        <p>Has adquirido el <strong>${plan}</strong> por <strong>${amount}</strong>.</p>
        <p>Nos pondremos en contacto contigo en las próximas 24 horas para comenzar tu proyecto.</p>
        <p>Puedes ver el estado de tu proyecto en tu <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard">dashboard</a>.</p>
        <p>Saludos,<br>El equipo de IA Services</p>
      </div>
    `,
  }),

  projectUpdate: (name: string, projectName: string, status: string) => ({
    subject: `Actualización de proyecto - ${projectName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Actualización de tu proyecto</h1>
        <p>Hola ${name},</p>
        <p>Tu proyecto <strong>${projectName}</strong> tiene una actualización:</p>
        <p style="background: #f3f4f6; padding: 16px; border-radius: 8px;">${status}</p>
        <p>Revisa los detalles en tu <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard">dashboard</a>.</p>
        <p>Saludos,<br>El equipo de IA Services</p>
      </div>
    `,
  }),
};
