import Navbar from "../home/nav";
import { getDictionary } from '../dictionaries'

export default async function TermsPage({params}) {
    const {lang} = await params;
    const dict = await getDictionary(lang); // en
    return (
      <main className="min-h-screen bg-white text-gray-900">
        <Navbar home={dict.lang.home} contactUs={dict.lang.contactUs} loginTitle={dict.lang.loginTitle} bookingTitle={dict.lang.bookingTitle} logoutTitle={dict.lang.logoutTitle} successLogout={dict.lang.LogoutSuccessful} lang={lang}/>
        {/* Header / Hero */}
        <section className="mt-15 border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white print:hidden">
          <div className="mx-auto max-w-5xl px-6 py-10">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Terms and Conditions</h1>
            <p className="mt-3 max-w-3xl text-sm text-gray-600">
              Please read these Terms carefully. By placing a booking or using our services, you agree to be bound by them.
            </p>
          </div>
        </section>
  
        {/* Body */}
        <section className="mx-auto max-w-5xl px-6 py-10">
          <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-10">
            {/* Sidebar: Table of contents */}
            <aside className="mb-10 lg:mb-0 lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] lg:overflow-y-auto print:hidden">
              <nav aria-label="Table of contents" className="rounded-2xl border border-gray-200 p-4 shadow-sm">
                <h2 className="text-sm font-medium text-gray-800">On this page</h2>
                <ol className="mt-3 space-y-2 text-sm text-gray-700">
                  {[
                    { id: "definitions", label: "1. Definitions and Scope" },
                    { id: "booking", label: "2. Booking and Reservation Process" },
                    { id: "payment", label: "3. Payment Terms" },
                    { id: "changes", label: "4. Changes and Cancellations" },
                    { id: "service", label: "5. Service Standards" },
                    { id: "child", label: "6. Child Safety & Accessibility" },
                    { id: "luggage", label: "7. Luggage Policy" },
                    { id: "insurance", label: "8. Insurance and Liability" },
                    { id: "ip", label: "9. Intellectual Property and Website Use" },
                    { id: "privacy", label: "10. Privacy and Data Protection" },
                    { id: "law", label: "11. Governing Law and Jurisdiction" },
                    { id: "contact", label: "12. Contact Details" },
                    { id: "changes-to-terms", label: "13. Changes to Terms" },
                  ].map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="inline-flex items-start rounded-md px-2 py-1 hover:bg-gray-50 hover:text-gray-900"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
  
            {/* Section 1: Definitions and Scope */}
            <div>
            <div className="m-10 text-lg" id="definitions">
                <h2 id="definitions" className="mb-5 text-2xl font-bold text-slate-900 flex items-center gap-4">
                    1. Definitions and Scope
                </h2>
                <p className="my-3 text-slate-700 leading-relaxed">
                    These Terms and Conditions ("Terms") set out the rules for all reservations made via the website
                    <strong> barcelonacitytaxi.com</strong> ("Website"), which is owned and managed by Barcelona City Taxi
                    ("we", "our", "us"). By placing a booking or using our services, you acknowledge and accept these Terms.
                </p>
                <p className="my-3 text-slate-700">For the purposes of these Terms:</p>
                <div className="flex flex-col gap-3">
                    <p className="text-slate-700">
                    <strong>Client / Passenger:</strong> The person or legal entity making the booking.
                    </p>
                    <p className="text-slate-700">
                    <strong>Service:</strong> Any ground transport we or our partners provide, including but not limited to
                    airport transfers, intercity journeys, hourly hire, and tailored travel arrangements.
                    </p>
                    <p className="text-slate-700">
                    <strong>Vehicle Category:</strong> The service tier chosen at booking (e.g., Economy, Standard, Executive,
                    First Class), not a specific make or model.
                    </p>
                    <p className="text-slate-700">
                    <strong>Booking Confirmation:</strong> The confirmation email sent after successful payment, containing
                    full trip details and serving as proof of contract.
                    </p>
                </div>
                </div>

                {/* Section 2: Booking and Reservation Process */}
                <div id="booking" className="m-10 text-lg">
                <h2 id="booking" className="mb-5 text-2xl font-bold text-slate-900 flex items-center gap-4">
                    2. Booking and Reservation Process
                </h2>
                <h3 id="eligibility" className="mb-2 text-xl font-bold text-slate-900">
                    2.1 Eligibility
                </h3>
                <p className="my-3 text-slate-700">To make a reservation, the Client must:</p>
                <ul className="list-disc ml-7 text-slate-700">
                    <li className="my-3">Be at least 18 years old.</li>
                    <li className="my-3">Provide accurate and complete personal details.</li>
                    <li className="my-3">Have the legal authority to enter into a binding agreement.</li>
                </ul>
                <p className="my-3 text-slate-700">
                    We reserve the right to cancel any booking that does not meet these requirements.
                </p>

                <h3 id="how-to-book" className="my-2 text-xl font-bold text-slate-900">
                    2.2 How to Book
                </h3>
                <p className="my-3 text-slate-700">
                    Bookings can be made through our secure online system on the Website. The Client must:
                </p>
                <ul className="list-disc ml-7 text-slate-700">
                    <li className="my-3">Choose the service type, vehicle category, pickup/drop-off points, date, and time.</li>
                    <li className="my-3">
                    Provide correct passenger details and note any special requirements (e.g., child seats, mobility
                    assistance).
                    </li>
                    <li className="my-3">Review the fare estimate and confirm the booking by making payment.</li>
                </ul>
                <p className="my-3 text-slate-700">
                    Reservations made via third-party platforms (e.g., travel agencies, partner sites) are also subject to these
                    Terms.
                </p>

                <h3 id="confirmation" className="my-2 text-xl font-bold text-slate-900">
                    2.3 Confirmation of Booking
                </h3>
                <p className="my-3 text-slate-700">
                    A booking becomes binding only when we send the Booking Confirmation email after receiving payment. This
                    confirmation will include trip details, payment summary, and contact information. If we cannot provide the
                    requested service, we will inform you promptly and issue a full refund via your original payment method.
                </p>

                <h3 id="pickup-policy" className="my-2 text-xl font-bold text-slate-900">
                    2.4 Airport &amp; Pickup Policy
                </h3>
                <ul className="list-disc ml-7 text-slate-700">
                    <li className="my-3">
                    <strong>Airports</strong> – 60 minutes of free waiting from actual flight arrival, tracked in real time.
                    </li>
                    <li className="my-3">
                    <strong>Hotels / Private Addresses</strong> – 15 minutes free waiting.
                    </li>
                    <li className="my-3">
                    <strong>Cruise Ports</strong> – 30 minutes free waiting.
                    </li>
                </ul>
                <p className="my-3 text-slate-700">
                    Clients must ensure their contact details are reachable on the day of travel. If the passenger does not
                    appear within the waiting period and no contact is made, the booking will be treated as a no-show and no
                    refund will be given.
                </p>
                </div>

                {/* Section 3: Payment Terms */}
                <div id="payment" className="m-10 text-lg">
                <h2 className="mb-5 text-2xl font-bold text-slate-900 flex items-center gap-4">
                    3. Payment Terms
                </h2>

                <h3 className="mb-2 text-xl font-bold text-slate-900">3.1 Pricing and Fare Estimates</h3>
                <p className="my-3 text-slate-700">
                    All prices are in Euros (€) and include applicable taxes unless stated otherwise. The fare shown during
                    booking is based on the details provided and may change if the route, waiting time, stops, or service level
                    changes.
                </p>

                <h3 className="my-2 text-xl font-bold text-slate-900">3.2 Accepted Payment Methods</h3>
                <p className="my-3 text-slate-700">We accept:</p>
                <ul className="list-disc ml-7 text-slate-700">
                    <li className="my-3">Major credit/debit cards (Visa, MasterCard, American Express)</li>
                    <li className="my-3">Stripe secure payment gateway</li>
                    <li className="my-3">Bank transfers (for corporate or group bookings)</li>
                    <li className="my-3">Bizum or PayPal (by prior arrangement)</li>
                </ul>

                <h3 className="my-2 text-xl font-bold text-slate-900">3.3 Payment Requirements</h3>
                <p className="my-3 text-slate-700">
                    Full payment is required to confirm a booking unless otherwise agreed in writing.
                </p>

                <h3 className="my-2 text-xl font-bold text-slate-900">3.4 Security of Transactions</h3>
                <p className="my-3 text-slate-700">
                    All payments are processed via encrypted connections through secure third-party providers. We do not store
                    card details. Payment handling complies with PCI-DSS standards.
                </p>

                <h3 className="my-2 text-xl font-bold text-slate-900">3.5 Invoices</h3>
                <p className="my-3 text-slate-700">
                    A payment receipt or invoice will be emailed automatically after booking confirmation. Businesses may
                    request a VAT invoice by contacting us after booking.
                </p>
                </div>

                {/* Section 4: Changes and Cancellations */}
                <div id = "changes" className="m-10 text-lg">
                <h2 className="mb-5 text-2xl font-bold text-slate-900 flex items-center gap-4">
                    4. Changes and Cancellations
                </h2>

                <h3 className="mb-2 text-xl font-bold text-slate-900">4.1 Booking Changes</h3>
                <p className="my-3 text-slate-700">
                    You may request changes to pickup time, location, destination, passenger count, or extra services up to 24
                    hours before pickup. Requests must be sent in writing (email or WhatsApp) and are valid only once confirmed
                    by us. Additional charges may apply if the change increases travel time, distance, or service level.
                </p>

                <h3 className="my-2 text-xl font-bold text-slate-900">4.2 Short-Notice Changes</h3>
                <p className="my-3 text-slate-700">
                    For changes within 24 hours of pickup, contact your assigned driver directly if you have their details. We
                    will try to accommodate last-minute requests but cannot guarantee approval. Extra fees may apply.
                </p>

                <h3 className="my-2 text-xl font-bold text-slate-900">4.3 Cancellation & Refund Policy</h3>
                <ul className="list-disc ml-7 text-slate-700">
                    <li className="my-3">
                    <strong>Full Refund</strong> – Cancellations made at least 24 hours before pickup.
                    </li>
                    <li className="my-3">
                    <strong>No Refund</strong> – Cancellations within 24 hours of pickup or no-shows.
                    </li>
                </ul>
                <p className="my-3 text-slate-700">
                    Cancellations must be sent via email or WhatsApp and confirmed by us to be valid.
                </p>

                <h3 className="my-2 text-xl font-bold text-slate-900">4.4 Force Majeure</h3>
                <p className="my-3 text-slate-700">
                    If service is disrupted by events beyond our control (e.g., severe weather, strikes, civil unrest), we will
                    attempt to reschedule or provide a full refund. For flight cancellations or major delays, partial refunds or
                    rescheduling may be offered if we are informed promptly.
                </p>

                <h3 className="my-2 text-xl font-bold text-slate-900">4.5 Refund Processing</h3>
                <p className="my-3 text-slate-700">
                    Refunds will be made via the original payment method within 7–10 business days. Any payment provider fees
                    may be deducted unless the cancellation was our fault.
                </p>
                </div>

                {/* Section 5: Service Standards */}
                <div id="service" className="m-10 text-lg">
                <h2 className="mb-5 text-2xl font-bold text-slate-900 flex items-center gap-4">
                    5. Service Standards
                </h2>

                <h3 className="mb-2 text-xl font-bold text-slate-900">5.1 Driver Conduct</h3>
                <p className="my-3 text-slate-700">
                    All drivers are licensed, insured, and trained professionals. They are expected to provide safe, courteous,
                    and punctual service, including reasonable luggage assistance. Any concerns about driver conduct should be
                    reported immediately.
                </p>

                <h3 className="my-2 text-xl font-bold text-slate-900">5.2 Vehicle Quality</h3>
                <p className="my-3 text-slate-700">
                    Vehicles are allocated according to the booked category and are kept clean, climate-controlled, and
                    roadworthy. Exact makes/models may vary. We may upgrade your vehicle category at no extra cost if necessary.
                </p>

                <h3 className="my-2 text-xl font-bold text-slate-900">5.3 Waiting Time</h3>
                <ul className="list-disc ml-7 text-slate-700">
                    <li className="my-3">Airports – 60 minutes free from actual landing time.</li>
                    <li className="my-3">
                    Other Pickups – 15 minutes free from scheduled pickup time. Extra waiting time may be charged.
                    </li>
                </ul>

                <h3 className="my-2 text-xl font-bold text-slate-900">5.4 Delays & No-Shows</h3>
                <p className="my-3 text-slate-700">
                    If delayed, inform us or your driver as soon as possible. Failure to appear without notice will be treated
                    as a no-show and charged in full.
                </p>

                <h3 className="my-2 text-xl font-bold text-slate-900">5.5 Luggage</h3>
                <p className="my-3 text-slate-700">
                    Each passenger may bring one standard suitcase and one carry-on. Bulky items (e.g., skis, wheelchairs,
                    strollers) must be declared in advance. We are not responsible for luggage damage unless caused by our
                    negligence.
                </p>

                <h3 className="my-2 text-xl font-bold text-slate-900">5.6 Pets</h3>
                <p className="my-3 text-slate-700">
                    Pets are allowed only in private transfers and must be in suitable carriers. A cleaning fee may apply if
                    extra cleaning is required.
                </p>
                </div>

                {/* Section 6: Child Safety & Accessibility */}
                <div id= "child" className="m-10 text-lg">
                <h2 className="mb-5 text-2xl font-bold text-slate-900 flex items-center gap-4">
                    6. Child Safety & Accessibility
                </h2>

                <h3 className="mb-2 text-xl font-bold text-slate-900">6.1 Child Restraints</h3>
                <p className="my-3 text-slate-700">
                    In line with Spanish and EU regulations, children under 135 cm or 12 years must use an appropriate child
                    seat. We can provide:
                </p>
                <ul className="list-disc ml-7 text-slate-700">
                    <li className="my-3">Infant seats (0–13 kg)</li>
                    <li className="my-3">Child seats (9–18 kg)</li>
                    <li className="my-3">Booster seats (15–36 kg)</li>
                </ul>
                <p className="my-3 text-slate-700">Seats must be requested at booking to ensure availability.</p>

                <h3 className="my-2 text-xl font-bold text-slate-900">6.2 Installation Responsibility</h3>
                <p className="my-3 text-slate-700">
                    Drivers may assist with installation, but parents/guardians are responsible for ensuring correct fitting. If
                    a suitable seat is unavailable and travel proceeds without it, the passenger accepts full responsibility.
                </p>

                <h3 className="my-2 text-xl font-bold text-slate-900">6.3 Accessibility</h3>
                <p className="my-3 text-slate-700">
                    We offer vehicles suitable for foldable wheelchairs and mobility aids. Fully wheelchair-accessible vehicles
                    must be requested in advance and are subject to availability. Please inform us during booking if assistance
                    is required for boarding or exiting the vehicle.
                </p>
                </div>

                {/* Section 7: Luggage Policy */}
                <div id = "luggage" className="m-10 text-lg">
                <h2 className="mb-5 text-2xl font-bold text-slate-900 flex items-center gap-4">
                    7. Luggage Policy
                </h2>

                <h3 className="mb-2 text-xl font-bold text-slate-900">7.1 Standard Allowance</h3>
                <p className="my-3 text-slate-700">
                    Each passenger is entitled to bring one medium-sized suitcase (up to 23 kg) and one small personal item
                    (such as a handbag or backpack) per booking. If you need extra luggage space, please inform us during the
                    booking process so we can assign a suitable vehicle.
                </p>

                <h3 className="my-2 text-xl font-bold text-slate-900">7.2 Oversized or Additional Items</h3>
                <p className="my-3 text-slate-700">
                    We can transport larger items—such as skis, golf clubs, strollers, or wheelchairs—if notified in advance. If
                    extra or oversized luggage is not declared beforehand, this may result in:
                </p>
                <ul className="list-disc ml-7 text-slate-700">
                    <li className="my-3">Upgrading to a larger vehicle (subject to availability)</li>
                    <li className="my-3">Additional handling or capacity charges</li>
                    <li className="my-3">
                    In rare cases, cancellation without refund if the items cannot be safely accommodated
                    </li>
                </ul>

                <h3 className="my-2 text-xl font-bold text-slate-900">7.3 Items Not Permitted</h3>
                <p className="my-3 text-slate-700">
                    For safety and legal reasons, the following are strictly prohibited in both checked and carry-on luggage:
                </p>
                <ul className="list-disc ml-7 text-slate-700">
                    <li className="my-3">Hazardous substances (e.g., explosives, flammable liquids)</li>
                    <li className="my-3">Illegal goods or contraband</li>
                    <li className="my-3">Weapons or firearms</li>
                    <li className="my-3">
                    Items likely to damage the vehicle or inconvenience other passengers (e.g., uncovered food, strong odors)
                    </li>
                </ul>

                <h3 className="my-2 text-xl font-bold text-slate-900">7.4 Passenger Responsibility</h3>
                <p className="my-3 text-slate-700">
                    You are responsible for your belongings at all times. We are not liable for:
                </p>
                <ul className="list-disc ml-7 text-slate-700">
                    <li className="my-3">Loss or theft of personal items during the journey</li>
                    <li className="my-3">Damage to fragile, perishable, or poorly packed goods</li>
                </ul>
                <p className="my-3 text-slate-700">
                    We recommend arranging travel insurance that covers loss, theft, or damage to personal property.
                </p>
                </div>

                {/* Section 8: Insurance and Liability */}
                <div id="insurance" className="m-10 text-lg">
                <h2 className="mb-5 text-2xl font-bold text-slate-900 flex items-center gap-4">
                    8. Insurance and Liability
                </h2>

                <h3 className="mb-2 text-xl font-bold text-slate-900">8.1 Travel Insurance</h3>
                <p className="my-3 text-slate-700">
                    We strongly advise passengers to arrange suitable travel insurance before their trip. This should cover
                    unexpected events such as cancellations, delays, accidents, medical issues, or loss/damage to luggage. We
                    are not responsible for costs arising from circumstances beyond our control.
                </p>

                <h3 className="my-2 text-xl font-bold text-slate-900">8.2 Limitation of Liability</h3>
                <p className="my-3 text-slate-700">
                    We are not liable for indirect or consequential losses, including missed flights or lost income. Our maximum
                    liability is limited to the amount paid for the booked service. We are not responsible for delays caused by
                    traffic, weather, force majeure events, or third-party actions.
                </p>

                <h3 className="my-2 text-xl font-bold text-slate-900">8.3 Force Majeure</h3>
                <p className="my-3 text-slate-700">
                    We accept no liability for disruptions caused by events outside our control, including natural disasters,
                    strikes, pandemics, war, government restrictions, or major traffic incidents. In such cases, we will make
                    reasonable efforts to reschedule or refund the booking.
                </p>
                </div>

                {/* Section 9: Intellectual Property and Website Use */}
                <div id="ip" className="m-10 text-lg">
                <h2 className="mb-5 text-2xl font-bold text-slate-900 flex items-center gap-4">
                    9. Intellectual Property and Website Use
                </h2>

                <h3 className="mb-2 text-xl font-bold text-slate-900">9.1 Website Content</h3>
                <p className="my-3 text-slate-700">
                    All materials on our website—including text, images, logos, icons, and videos—are owned by us or our content
                    providers. You may not copy, distribute, modify, or publish any content without prior written consent. For
                    permission requests, contact info@barcelonacitytaxi.com.
                </p>

                <h3 className="my-2 text-xl font-bold text-slate-900">9.2 Trademarks</h3>
                <p className="my-3 text-slate-700">
                    Our name, logo, and associated branding are protected trademarks. Unauthorized use may result in legal
                    action. Brand usage guidelines are available upon request.
                </p>

                <h3 className="my-2 text-xl font-bold text-slate-900">9.3 Acceptable Use</h3>
                <p className="my-3 text-slate-700">
                    You agree not to misuse our website, including attempting unauthorized access, uploading harmful code, or
                    engaging in unlawful or fraudulent activity.
                </p>

                <h3 className="my-2 text-xl font-bold text-slate-900">9.4 Third-Party Assets</h3>
                <p className="my-3 text-slate-700">
                    Some website elements (e.g., icons, fonts, scripts, images) are licensed from third parties and remain the
                    property of their respective owners. These are used in accordance with their licensing terms.
                </p>
                </div>

                {/* Section 10: Privacy and Data Protection */}
                <div id="privacy" className="m-10 text-lg">
                <h2 className="mb-5 text-2xl font-bold text-slate-900 flex items-center gap-4">
                    10. Privacy and Data Protection
                </h2>

                <h3 className="mb-2 text-xl font-bold text-slate-900">10.1 Compliance</h3>
                <p className="my-3 text-slate-700">
                    We comply with the General Data Protection Regulation (GDPR) and other applicable privacy laws. Personal
                    data is collected, stored, and processed only to deliver our services, improve user experience, and meet
                    legal obligations.
                </p>

                <h3 className="my-2 text-xl font-bold text-slate-900">10.2 Data Handling</h3>
                <p className="my-3 text-slate-700">
                    We may collect your name, contact details, travel information, and payment data. This information is shared
                    only with service providers directly involved in fulfilling your booking (e.g., drivers, payment
                    processors). We never sell or trade your personal data.
                </p>

                <h3 className="my-2 text-xl font-bold text-slate-900">10.3 Your Rights</h3>
                <p className="my-3 text-slate-700">Under GDPR, you have the right to:</p>
                <ul className="list-disc ml-7 text-slate-700">
                    <li className="my-3">Access the data we hold about you</li>
                    <li className="my-3">Request corrections to inaccurate or incomplete data</li>
                    <li className="my-3">Request deletion of your data ("right to be forgotten")</li>
                    <li className="my-3">Withdraw consent for data processing</li>
                </ul>
                <p className="my-3 text-slate-700">
                    To exercise these rights, contact info@barcelonacitytaxi.com. See our Privacy Policy for more details.
                </p>

                <h3 className="my-2 text-xl font-bold text-slate-900">10.4 Cookies</h3>
                <p className="my-3 text-slate-700">
                    Our site uses cookies and similar tools to improve functionality, personalize services, and analyze traffic.
                    In line with GDPR and the EU Digital Markets Act, we use a consent management tool (CookieYes) that allows
                    you to:
                </p>
                <ul className="list-disc ml-7 text-slate-700">
                    <li className="my-3">Choose which cookies to allow (e.g., essential, analytics, marketing)</li>
                    <li className="my-3">Change or withdraw consent at any time</li>
                </ul>
                <p className="my-3 text-slate-700">Full details are available in our Cookie Policy.</p>
                </div>

                {/* Section 11: Governing Law and Jurisdiction */}
                <div id="law" className="m-10 text-lg">
                <h2 className="mb-5 text-2xl font-bold text-slate-900 flex items-center gap-4">
                    11. Governing Law and Jurisdiction
                </h2>
                <p className="my-3 text-slate-700">
                    These Terms are governed by Spanish law. Any disputes will be handled exclusively by the courts of
                    Barcelona, Spain. By using our services, you agree to this jurisdiction.
                </p>
                </div>

                {/* Section 12: Contact Details */}
                <div id="contact" className="m-10 text-lg">
                <h2 className="mb-5 text-2xl font-bold text-slate-900 flex items-center gap-4">
                    12. Contact Details
                </h2>
                <p className="my-3 text-slate-700">
                    For questions, concerns, or requests regarding these Terms, our services, or your personal data, please
                    contact us. Our customer service team aims to respond within 24 business hours.
                </p>
                </div>

                {/* Section 13: Changes to Terms */}
                <div id="changes-to-terms" className="m-10 text-lg">
                <h2 className="mb-5 text-2xl font-bold text-slate-900 flex items-center gap-4">
                    13. Changes to Terms
                </h2>
                <p className="my-3 text-slate-700">
                    We may update these Terms at any time without prior notice. Changes take effect immediately upon publication
                    unless otherwise stated. It is your responsibility to review the Terms periodically. Continued use of our
                    services after updates indicates acceptance of the revised Terms.
                </p>
                </div>
            </div>
          </div>
        </section>
  
        {/* Footer hint (hidden on print) */}
        <footer className="border-t border-gray-200 bg-gray-50 py-8 text-center text-xs text-gray-500 print:hidden">
          © {new Date().getFullYear()} Barcelona City Taxi. All rights reserved.
        </footer>
      </main>
    );
  }
  