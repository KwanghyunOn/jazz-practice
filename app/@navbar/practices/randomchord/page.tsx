import { Navbar, NavbarContentBack } from "@/components/Navbar"

export default function PracticeNavbar() {
  return (
    <Navbar
      title="Random Chord Practice"
      contentLeft={<NavbarContentBack href="/" />}
    />
  )
}
