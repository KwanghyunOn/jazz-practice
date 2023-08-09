import { Navbar, NavbarContentMenu } from "@/components/Navbar"

export default function PracticeNavBar() {
  return (
    <Navbar
      title="Jazz Practice"
      contentLeft={<NavbarContentMenu href="#" />}
    />
  )
}
