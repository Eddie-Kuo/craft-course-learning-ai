"use client";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface AvatarProps {}

function Avatar({}: AvatarProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button>User</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-center gap-2 p-2">
          <div>
            <p>Name</p>
            <p>Email</p>
            <p>Available Credits:</p>
            <p>Settings</p>
            <p>Sign Out</p>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Avatar;
