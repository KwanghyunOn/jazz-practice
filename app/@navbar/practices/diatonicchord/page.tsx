import { Navbar, NavbarContentBack } from "@/components/Navbar"

export default function PracticeNavbar() {
  return (
    <Navbar
      title="Diatonic Chord Practice"
      contentLeft={<NavbarContentBack href="/" />}
    />
  )
}
