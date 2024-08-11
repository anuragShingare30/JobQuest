import React from 'react'
import {NavHeader} from "./NavHeader";
import { Navlink } from './NavLinks';
import { UserProfile } from './UserProfile';

const SideBar = () => {
  return (
    <div>
      <NavHeader></NavHeader>
      <Navlink></Navlink>
      <UserProfile></UserProfile>
    </div>
  )
}

export {SideBar};
