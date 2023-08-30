import { Navbar } from "@/components/Navbar"

import {
  NavbarContentMenu,
  NavbarContentProfile,
} from "@/components/NavbarContent"

export default function PracticeNavbar() {
  return (
    <Navbar
      title="Jazz Practice"
      contentLeft={<NavbarContentMenu href="#" />}
      contentRight={<NavbarContentProfile />}
    />
  )
}
