import { Navbar } from "@/components/Navbar"
import { NavbarContentBack } from "@/components/NavbarContent"

export default function RegisterNavbar() {
  return (
    <Navbar
      title="Jazz Practice"
      contentLeft={<NavbarContentBack href="/" />}
    />
  )
}
