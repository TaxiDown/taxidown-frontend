import Link from "next/link";
import { getDictionary } from '../../dictionaries.js'

export default async function UnauthorizedPage({params}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="flex items-center space-x-4">
        <h1 className="border-r pr-4 text-2xl font-semibold text-black ml-10">401</h1>
        <div className="text-gray-700">
          <p className="text-lg">{dict.unauthorized.error}</p>
        </div>
      </div>
      <Link href={`/${lang}/login`} className="text-white mt-7 py-3 px-6 bg-black inline-block rounded-md text-lg">
        {dict.unauthorized.loginTitle}
      </Link>
    </div>
  );
}