import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { FaFilter } from "react-icons/fa";

export default function DropDownUI() {
  return (
    <div className="w-full flex max-sm:p-2 md:pl-12  md:pr-12 h-auto">
      <div className="mr-auto">
        <h1 className="font-extralight">Welcome back !</h1>
        <p className="text-blue-500">Suraj Kharkwal</p>
      </div>
      <Dropdown>
        <DropdownTrigger>
          <Button className="bg-blue-500 text-white">
            <FaFilter /> Filter
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem key="new">Mounthly</DropdownItem>
          <DropdownItem key="copy">Weakly</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
