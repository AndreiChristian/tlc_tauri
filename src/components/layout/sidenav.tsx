import { BadgeAlert, Beef, Calendar, Home, ListOrdered, MapPin, Package2, Settings, TargetIcon, User } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { ModeToggle } from "../theme/theme-toggle";
import { ReactNode } from "react";

export default function Sidenav() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden flex-col border-r bg-background sm:flex w-[10%]">
      <nav className="h-full flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          to="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <TargetIcon className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <SideNavLink to="/" name="Acasa" >
          <Home className="h-5 w-5" />
        </SideNavLink>
        <SideNavLink to="/locations" name="Locatii" >
          <MapPin className="h-5 w-5" />
        </SideNavLink>
        <SideNavLink to="/staff" name="Personal" >
          <User className="h-5 w-5" />
        </SideNavLink>
        <SideNavLink to="/inventory" name="Stocuri" >
          <Beef className="h-5 w-5" />
        </SideNavLink>
        <SideNavLink to="/orders" name="Comenzi" >
          <ListOrdered className="h-5 w-5" />
        </SideNavLink>
        <SideNavLink to="/calendar" name="Calendar" >
          <Calendar className="h-5 w-5" />
        </SideNavLink>
        <SideNavLink to="/issues" name="Probleme" >
          <BadgeAlert className="h-5 w-5" />
        </SideNavLink>
        <SideNavLink to="/settings" name="Setari" >
          <Settings className="h-5 w-5" />
        </SideNavLink>
        <div className="flex-1" ></div>
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
        "p-1 flex items-center gap-3 justify-start rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground md:h-8 w-full " :
        "p-1 flex items-center gap-3 justify-start rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 w-full "
      }
    >
      {children}
      <span>{name}</span>
    </NavLink>
  )
}
