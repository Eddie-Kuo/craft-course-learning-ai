"use client";

import { User } from "next-auth";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface AvatarProps {
  user: User;
  credits: number;
}

function Avatar({ user, credits }: AvatarProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button>User</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-center gap-2 p-2">
          <div>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>Available Credits: {credits}</p>
            <p>Settings</p>
            <p>Sign Out</p>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Avatar;
