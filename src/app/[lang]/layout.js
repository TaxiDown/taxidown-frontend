import Consent from "./consent";
import "./styling/globals.css";

export default function Layout({ children }) {
  return (
  <section className="w-[100vw] h-lvh overflow-x-hidden " >
    <Consent />
    {children}
  </section>
  )
}

