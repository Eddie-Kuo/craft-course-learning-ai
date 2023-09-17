"use client";

import { User } from "next-auth";
import Image from "next/image";
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
        {/* Hydration Error: Button Inside a button */}
        {/* <Button>User</Button> */}
        <Image
          alt="user picture"
          src={user.image!}
          width={50}
          height={50}
          className="rounded-full"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex flex-col gap-2 px-4 py-3">
          <div className="flex items-center gap-3">
            <Image
              alt="user picture"
              src={user.image!}
              width={40}
              height={40}
              className="rounded-full"
            />
            <p>{user.name}</p>
          </div>
          <p>{user.email}</p>
          <div className="w-full border-b border-zinc-200" />
          <div className="w-full border-b border-zinc-200" />
          <p>Available Credits: {credits}</p>
          <p>Settings</p>
          <p>Sign Out</p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Avatar;
