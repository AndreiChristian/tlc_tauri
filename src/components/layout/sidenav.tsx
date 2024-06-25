import { BadgeAlert, Home, MapPin, Package2, Settings, TargetIcon, User } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { ModeToggle } from "../theme/theme-toggle";
import { ReactNode } from "react";

export default function Sidenav() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          to="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <TargetIcon className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <SideNavLink to="/" name="Dashboard" >
          <Home className="h-5 w-5" />
        </SideNavLink>
        <SideNavLink to="/locations" name="locations" >
          <MapPin className="h-5 w-5" />
        </SideNavLink>
        <SideNavLink to="/issues" name="Issues" >
          <BadgeAlert className="h-5 w-5" />
        </SideNavLink>
        <SideNavLink to="/staff" name="Staff" >
          <User className="h-5 w-5" />
        </SideNavLink>
        <SideNavLink to="/settings" name="Settings" >
          <Settings className="h-5 w-5" />
        </SideNavLink>
        <ModeToggle />
      </nav>
    </aside>
  )
}

function SideNavLink({ to, name, children }: { to: string, name: string, children: ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => isActive ?
        "flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8" :
        "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
      }
    >
      {children}
      <span className="sr-only">{name}</span>
    </NavLink>
  )
}
