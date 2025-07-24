import Navbar from "./home/nav"
import { getDictionary } from "../dictionaries"

export default async function NavLayout({ children, params }) {
  const {lang} = await params
  const dict = await getDictionary(lang)
  return(
    <section>
      {children}
    </section>
  )
}

