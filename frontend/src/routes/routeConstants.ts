/**
 * Centralized route path constants
 * Use these instead of hardcoded strings throughout the application
 */
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  // Add more routes as your app grows
  // PROFILE: '/profile',
  // SETTINGS: '/settings',
  // GAMES: '/games',
} as const

export type RouteKey = keyof typeof ROUTES
export type RoutePath = typeof ROUTES[RouteKey]
