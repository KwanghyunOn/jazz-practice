import { Navbar, NavbarContentMenu } from "@/components/Navbar"

export default function PracticeNavbar() {
  return (
    <Navbar
      title="Jazz Practice"
      contentLeft={<NavbarContentMenu href="#" />}
    />
  )
}
