import Link from "next/link";
import {
  YoutubeLogo,
  FacebookLogo,
  InstagramLogo,
  TiktokLogo,
  Envelope,
  Phone,
} from "@phosphor-icons/react/dist/ssr";

const footerCols = [
  {
    title: "Mosque",
    links: ["Prayer Times", "About", "Facilities", "Parking & Access"],
  },
  {
    title: "Community",
    links: ["Events", "Classes", "Programmes", "Volunteer"],
  },
  {
    title: "RC26 Hackathon",
    links: ["Declare Mosque", "Join Discord", "Submit Project"],
  },
];

const socialLinks = [
  {
    label: "YouTube",
    href: "https://youtube.com/@mai13.official?si=RH8Y5IGFg8BSBMb8",
    icon: <YoutubeLogo size={18} weight="fill" aria-hidden />,
  },
  {
    label: "Facebook",
    href: "https://facebook.com/mai13.official",
    icon: <FacebookLogo size={18} weight="fill" aria-hidden />,
  },
  {
    label: "Threads",
    href: "https://www.threads.com/@mai13.official?xmt=AQF00BimCLs6wRPZyLs8-c3IIKs_iWSh2BTAs8RSq-QCh78",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.988-.43-1.7-.91-2.102-.598-.505-1.518-.756-2.734-.748l-.007-.002c-.969.007-2.565.316-3.497 2.357l-1.875-.87c.866-1.912 2.407-3.646 5.387-3.668 1.673-.012 3.019.417 4.001 1.274 1.091.947 1.64 2.368 1.721 4.358.176.107.35.218.516.334 1.28.921 2.108 2.152 2.463 3.648.602 2.504.07 5.435-2.517 7.967-1.916 1.875-4.237 2.692-7.327 2.712z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/mai13.official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    icon: <InstagramLogo size={18} weight="fill" aria-hidden />,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@mai13.official?is_from_webapp=1&sender_device=pc",
    icon: <TiktokLogo size={18} weight="fill" aria-hidden />,
  },
];

const contactInfo = [
  {
    label: "Email",
    value: "masjidalikhlas13@gmail.com",
    href: "mailto:masjidalikhlas13@gmail.com",
    icon: <Envelope size={15} weight="regular" aria-hidden />,
  },
  {
    label: "Phone",
    value: "03-5523 8877",
    href: "tel:+60355238877",
    icon: <Phone size={15} weight="regular" aria-hidden />,
  },
];

export function Footer() {
  return (
    <footer className="bg-sidebar py-10 md:py-16 px-4 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 pb-8 md:pb-12 border-b border-primary-foreground/8 mb-8">
        {/* Brand + contact + social */}
        <div className="md:col-span-1">
          <div className="font-serif text-primary-foreground text-xl mb-3">
            Masjid Al-Ikhlas Seksyen 13
          </div>
          <p className="text-primary-foreground/35 text-sm leading-relaxed max-w-65 mb-5">
            Connecting the Seksyen 13, Shah Alam Muslim community through
            prayer, education, and service since 2013.
          </p>

          {/* Contact */}
          <div className="flex flex-col gap-2.5 mb-6">
            {contactInfo.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-2.5 text-primary-foreground/45 text-sm hover:text-primary-foreground transition-colors no-underline group"
              >
                <span className="text-secondary/70 group-hover:text-secondary transition-colors shrink-0">
                  {item.icon}
                </span>
                {item.value}
              </Link>
            ))}
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3 flex-wrap">
            {socialLinks.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-primary-foreground/10 text-primary-foreground/40 hover:border-secondary/50 hover:text-secondary transition-colors no-underline"
              >
                {s.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* Nav columns */}
        {footerCols.map((col, i) => (
          <div key={i} className="footer-col">
            <h4 className="text-secondary text-[0.62rem] tracking-[0.2em] uppercase mb-4.5">
              {col.title}
            </h4>
            {col.links.map((link, j) => (
              <Link
                key={j}
                href="#"
                className="block text-primary-foreground/45 text-sm mb-2.5 hover:text-primary-foreground transition-colors no-underline"
              >
                {link}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center flex-wrap gap-3">
        <div className="text-primary-foreground/25 text-sm">
          © 2026 Masjid Al-Ikhlas Seksyen 13 · Built for RC26
        </div>
        <div className="font-serif text-primary-foreground/20 text-lg tracking-wide">
          بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
        </div>
      </div>
    </footer>
  );
}
