import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactForm } from "@/components/contact-form";

const R2 = "/images";

const team = [
  { name: "Haylee Trinh", role: "Founder & CEO", photo: `${R2}/elements/haylee.avif` },
  { name: "Sophie", role: "Admin" },
  { name: "Jung", role: "Reseller Admin" },
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Meet The Team */}
        <section className="w-full bg-white">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-10 px-4 py-24 text-center sm:px-6 lg:py-32">
            <h1 className="text-[2.5rem] font-normal leading-tight text-brand-orange sm:text-[3.125rem]">
              Meet The Team
            </h1>
            <div className="grid w-full max-w-2xl grid-cols-1 gap-8 sm:grid-cols-3">
              {team.map((person) => (
                <div key={person.name} className="flex flex-col items-center gap-3">
                  <div className="h-32 w-32 overflow-hidden rounded-full bg-gradient-to-br from-brand-orange/20 to-brand-pink/20">
                    {person.photo ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={person.photo}
                        alt={person.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-2xl text-brand-navy/30">
                        {person.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <h2 className="text-lg font-normal text-brand-navy">
                    {person.name}
                  </h2>
                  <p className="font-poppins text-sm font-extralight text-brand-navy/70">
                    {person.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="w-full bg-white">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-10 px-4 py-24 text-center sm:px-6 lg:py-32">
            <h2 className="text-[2.5rem] font-normal leading-tight text-brand-orange sm:text-[3.125rem]">
              Contact
            </h2>
            <div className="grid w-full max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2">
              <div className="flex flex-col items-center gap-2">
                <h3 className="text-lg font-normal text-brand-navy">Address</h3>
                <p className="font-poppins text-[17px] font-extralight leading-relaxed text-brand-navy">
                  Melbourne, VIC 3000
                </p>
                <a
                  href="https://wa.me/61474749999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-brand-navy transition hover:text-brand-orange"
                >
                  +61474749999
                </a>
                <a
                  href="mailto:ggagency.bigo@gmail.com"
                  className="text-base text-brand-navy transition hover:text-brand-orange"
                >
                  ggagency.bigo@gmail.com
                </a>
              </div>
              <div className="flex flex-col items-center gap-2">
                <h3 className="text-lg font-normal text-brand-navy">
                  Opening Hours
                </h3>
                <p className="font-poppins text-[17px] font-extralight leading-relaxed text-brand-navy">
                  Monday – Sunday
                </p>
                <p className="font-poppins text-[17px] font-extralight leading-relaxed text-brand-navy">
                  11:00 am – 1:00 am AEST
                </p>
              </div>
            </div>

            {/* Google Maps embed */}
            <div className="w-full overflow-hidden rounded-xl shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537363153169!3d-37.8136279797517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b34964f%3A0xf0c2f0b0c0c0c0c0!2sMelbourne%20VIC%203000!5e0!3m2!1sen!2sau!4v1700000000000!5m2!1sen!2sau"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="GG Agency Location"
              />
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <ContactForm />
      </main>
      <SiteFooter />
    </>
  );
}
