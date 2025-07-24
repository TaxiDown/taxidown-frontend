import ConfirmClient from './form';
import { getDictionary } from '../../dictionaries.js'

export default async function ConfirmEmailPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <ConfirmClient lang={lang} dict={dict.confirmEmail} />;
}
