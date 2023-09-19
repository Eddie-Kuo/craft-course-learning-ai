"use client";

import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
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

//Todo!: Add in a default image for users who don't have a profile picture and remove the declaration in Image source since user image may not always be supplied

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
        <div className="flex flex-col py-2">
          <div className="mb-1 gap-2 px-4">
            <div className="mb-2 flex items-center gap-3">
              <Image
                alt="user picture"
                src={user.image!}
                width={40}
                height={40}
                className="rounded-full"
              />
              <p className="text-lg font-bold">{user.name}</p>
            </div>
            <p className="text-sm text-zinc-500">{user.email}</p>
            <div className="m-1 w-full border-b border-zinc-200" />
            <div className="m-1 w-full border-b border-zinc-200" />
            <p className="truncate text-sm text-zinc-500">
              Available Credits: {credits}
            </p>
          </div>

          {/* Settings */}

          <Link
            className="text-md flex justify-start rounded-md bg-slate-100 px-4 py-2 font-medium text-darkText hover:bg-slate-200"
            href="/settings"
          >
            Upgrade to Pro
          </Link>

          {/* Logout */}
          <Button
            className="text-md flex items-center justify-between bg-transparent text-darkText hover:bg-slate-100"
            onClick={() => signOut()}
          >
            Sign Out
            <HiArrowRightOnRectangle />
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Avatar;
