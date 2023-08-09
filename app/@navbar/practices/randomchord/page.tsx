import { Navbar, NavbarContentBack } from "@/components/Navbar"

export default function PracticeNavBar() {
  return (
    <Navbar
      title="Random Chord Practice"
      contentLeft={<NavbarContentBack href="/" />}
    />
  )
}
