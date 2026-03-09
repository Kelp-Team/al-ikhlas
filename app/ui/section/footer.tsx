import { GeometricPattern } from "./geometric-pattern";
import Image from "next/image";
import Link from "next/link";
import {
  YoutubeLogo,
  FacebookLogo,
  InstagramLogo,
  TiktokLogo,
  Envelope,
  Phone,
  ThreadsLogo,
} from "@phosphor-icons/react/dist/ssr";

const footerCols = [
  {
    href: "",
    logo: "/logo.png",
    logoAlt: "Masjid Al-Ikhlas Seksyen 13",
  },
  {
    href: "https://krackeddevs.com/",
    logo: "/kdlogodev.svg",
    logoAlt: "KrackedDevs",
  },
];

const socialLinks = [
  {
    label: "YouTube",
    href: "https://youtube.com/@mai13.official",
    icon: <YoutubeLogo size={18} weight="fill" aria-hidden />,
  },
  {
    label: "Facebook",
    href: "https://facebook.com/mai13.official",
    icon: <FacebookLogo size={18} weight="fill" aria-hidden />,
  },
  {
    label: "Threads",
    href: "https://www.threads.com/@mai13.official",
    icon: <ThreadsLogo size={18} weight="fill" aria-hidden />,
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
    <footer className="relative bg-sidebar py-10 md:py-16 px-4 md:px-12">
      <div className="absolute inset-0 mask-[linear-gradient(to_right,transparent,black)] pointer-events-none">
        <GeometricPattern className="absolute inset-0 opacity-[0.02]" />
      </div>
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
          <div key={i} className="footer-col md:col-start-4">
            <h4 className="text-secondary text-[0.62rem] tracking-[0.2em] uppercase mb-4.5">
              {col.title}
            </h4>
            <Link href={col.href} target="_blank" rel="noopener noreferrer">
              <Image src={col.logo} alt={col.logoAlt} width={120} height={40} />
            </Link>
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
