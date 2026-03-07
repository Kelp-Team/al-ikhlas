import { HeaderBar } from "@/components/header-bar";

export default async function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderBar />
      {children}
    </>
  );
}
