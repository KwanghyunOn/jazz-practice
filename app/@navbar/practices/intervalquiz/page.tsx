import { Navbar, NavbarContentBack } from "@/components/Navbar"

export default function PracticeNavbar() {
  return (
    <Navbar
      title="Interval quiz"
      contentLeft={<NavbarContentBack href="/" />}
    />
  )
}
