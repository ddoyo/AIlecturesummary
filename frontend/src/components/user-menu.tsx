"use client"

import { useAuth } from "@/hooks/use-auth"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings, User } from "lucide-react"
import Link from "next/link"

export function UserMenu() {
  const { user, logout, isLoading } = useAuth()

  if (isLoading) {
    // 로딩 중일 때는 아무 것도 보여주지 않거나, 로딩 스피너 등으로 대체
    return (
      <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
    )
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/login">
          <Button variant="ghost" size="sm" className="rounded-full px-4">
            로그인
          </Button>
        </Link>
        <Link href="/register">
          <Button
            size="sm"
            className="rounded-full px-4 bg-linear-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 border-0"
          >
            회원가입
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 border-2 border-primary">
            <AvatarFallback className="bg-linear-to-r from-pink-500 to-orange-500 text-white">
              {(user.name ?? "??").slice(-2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name ?? "이름 없음"}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email ?? "이메일 없음"}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/dashboard">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>내 정보</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>설정</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>로그아웃</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
