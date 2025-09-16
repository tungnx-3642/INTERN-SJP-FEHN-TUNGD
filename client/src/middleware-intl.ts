import createMiddleware from 'next-intl/middleware';

export const intlMiddleware = createMiddleware({
  locales: ['en', 'vi'],
  defaultLocale: 'vi',
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
