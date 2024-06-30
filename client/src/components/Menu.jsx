import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Center,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";

function MenuOption({ method1, method2, block }) {
  return (
    <div>
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<BsThreeDotsVertical />}
          bg={"transparent"}
          p={{ base: 0, sm: 3 }}
        ></MenuButton>
        <MenuList>
          {!block ? (
            <MenuItem onClick={method1}>Block</MenuItem>
          ) : (
            <MenuItem>You blocked</MenuItem>
          )}
          <MenuItem onClick={() => method2(block)}>Clear chats</MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}

export default MenuOption;
