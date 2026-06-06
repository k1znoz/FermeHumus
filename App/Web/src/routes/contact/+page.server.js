import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import nodemailer from 'nodemailer';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const name = data.get('name')?.toString().trim();
		const email = data.get('email')?.toString().trim();
		const subject = data.get('subject')?.toString().trim() || 'Message depuis le site';
		const message = data.get('message')?.toString().trim();

		if (!name || !email || !message) {
			return fail(400, { error: 'Veuillez remplir tous les champs obligatoires.' });
		}

		// Basic email format check
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return fail(400, { error: 'Adresse email invalide.' });
		}

		const smtpUser = env.SMTP_USER;
		const smtpPass = env.SMTP_PASS;

		if (!smtpUser || !smtpPass) {
			console.error('SMTP_USER ou SMTP_PASS manquant dans les variables d\'environnement.');
			return fail(500, { error: 'Le service de messagerie n\'est pas configuré. Contactez-nous directement à fermehumus@gmail.com.' });
		}

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: smtpUser,
				pass: smtpPass
			}
		});

		try {
			await transporter.sendMail({
				from: `"${name}" <${smtpUser}>`,
				to: 'fermehumus@gmail.com',
				replyTo: email,
				subject: `[Contact Ferme de l'Humus] ${subject}`,
				text: `Nom : ${name}\nEmail : ${email}\n\n${message}`,
				html: `<p><strong>Nom :</strong> ${name}</p><p><strong>Email :</strong> ${email}</p><hr/><p>${message.replace(/\n/g, '<br/>')}</p>`
			});
		} catch (err) {
			console.error('Erreur envoi email:', err);
			return fail(500, { error: 'Erreur lors de l\'envoi du message. Réessayez ou contactez-nous à fermehumus@gmail.com.' });
		}

		return { success: true };
	}
};
