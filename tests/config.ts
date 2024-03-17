/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import '@testing-library/jest-dom'
import { configure } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

configure({ testIdAttribute: 'data-test' })

jest.mock('react-router-dom', async () => {
  const actual = await jest.requireActual('react-router-dom')

  return {
    ...(actual as any),

    useLocation: () => ({
      pathname: '/',
    }),
    matchPath: jest.fn(),
    withRouter: jest.fn(),
    useRouteMatch: jest.fn(),
    Link: ({ children, to }: { children: JSX.Element; to: string }) =>
      React.createElement('a', { href: to }, children),
  }
})

export * from '@testing-library/react'
