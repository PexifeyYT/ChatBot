import { i18nRouter } from "next-i18n-router"
import { NextResponse, type NextRequest } from "next/server"
import i18nConfig from "./i18nConfig"
import { mockHomeWorkspace } from "./lib/mock-data/store"

export async function middleware(request: NextRequest) {
  const i18nResult = i18nRouter(request, i18nConfig)
  if (i18nResult) return i18nResult

  try {
    // Always redirect to home workspace if on the root path
    if (request.nextUrl.pathname === "/") {
      return NextResponse.redirect(
        new URL(`/${mockHomeWorkspace.id}/chat`, request.url)
      )
    }

    return NextResponse.next()
  } catch (e) {
    return NextResponse.next({
      request: {
        headers: request.headers
      }
    })
  }
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next|auth).*)"
}
