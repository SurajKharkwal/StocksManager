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
  );
}
