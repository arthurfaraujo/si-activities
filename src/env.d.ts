/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    isAdmin?: boolean
    username?: string
  }

  interface SpringRole {
    id: number
    description: string
  }

  interface SessionData {
    createdAt: Date
    maxAge: number
    accessToken: string
    user: {
      id: number,
      name: string,
      nickname: string,
      roles: SpringRole[]
    }
  }
}
