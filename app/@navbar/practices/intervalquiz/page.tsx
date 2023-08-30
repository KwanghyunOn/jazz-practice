import { Navbar } from "@/components/Navbar"
import { NavbarContentBack } from "@/components/NavbarContent"

export default function PracticeNavbar() {
  return (
    <Navbar
      title="Interval quiz"
      contentLeft={<NavbarContentBack href="/" />}
    />
  )
}
