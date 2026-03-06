import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  House,
  CalendarBlank,
  SignOut,
  CaretUpDown,
} from "@phosphor-icons/react";
import { signOut } from "@/lib/auth-client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navItems = [{ href: "/dashboard", label: "Dashboard", icon: House }];

const adminItems = [
  { href: "/events", label: "Manage Events", icon: CalendarBlank },
];

type AppSidebarProps = {
  isAdmin: boolean;
  user: { name: string; email: string };
};

export function AppSidebar({ isAdmin, user }: AppSidebarProps) {
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push("/login");
  }

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Masjid Al-Ikhlas Seksyen 13"
            height={32}
            width={32}
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    tooltip={item.label}
                    render={<Link href={item.href} />}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {isAdmin && (
          <SidebarGroup>
            <SidebarGroupLabel>Admin</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      tooltip={item.label}
                      render={<Link href={item.href} />}
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Popover>
              <PopoverTrigger className="flex w-full items-center gap-2 rounded-none p-2 text-left text-xs hover:bg-sidebar-accent">
                <div className="flex size-7 items-center justify-center rounded-full bg-sidebar-accent text-xs font-medium">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-xs font-medium">
                    {user.name}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
                <CaretUpDown className="ml-auto shrink-0" />
              </PopoverTrigger>
              <PopoverContent side="right" align="center" className="w-56 p-1">
                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-2 rounded-none p-2 text-xs hover:bg-sidebar-accent"
                >
                  <SignOut />
                  <span>Sign out</span>
                </button>
              </PopoverContent>
            </Popover>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
