// app/[lang]/reset-password/page.js
import { getDictionary } from '../../dictionaries.js'
import ResetClient from './form';

export default async function ResetPasswordPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <ResetClient dict={dict} lang={lang} />;
}
