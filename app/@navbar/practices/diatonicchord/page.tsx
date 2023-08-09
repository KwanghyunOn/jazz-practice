import Navbar, { NavbarContentBack } from "@/components/Navbar"

export default function PracticeNavBar() {
  return (
    <Navbar
      title="Diatonic Chord Practice"
      contentLeft={<NavbarContentBack href="/" />}
    />
  )
}
