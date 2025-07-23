import { getDictionary } from '../../dictionaries.js'
import ForgotClient from './form';

export default async function ForgotPasswordPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <ForgotClient dict={dict} lang={lang} />;
}
