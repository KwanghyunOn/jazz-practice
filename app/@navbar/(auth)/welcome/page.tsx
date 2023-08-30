import { Navbar } from "@/components/Navbar"
import {
  NavbarContentBack,
  NavbarContentProfile,
} from "@/components/NavbarContent"

export default function WelcomeNavbar() {
  return (
    <Navbar
      title="Jazz Practice"
      contentLeft={<NavbarContentBack href="/" />}
      contentRight={<NavbarContentProfile />}
    />
  )
}
