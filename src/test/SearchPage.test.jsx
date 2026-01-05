import { render, screen } from '@testing-library/react'
import SearchPage from '../pages/SearchPage'
import { BrowserRouter } from 'react-router-dom'

test('renders search page heading', () => {
  render(
    <BrowserRouter>
      <SearchPage />
    </BrowserRouter>
  )

  expect(
    screen.getByText(/Find Your Dream Property/i)
  ).toBeInTheDocument()
})

test('displays property cards', () => {
  render(
    <BrowserRouter>
      <SearchPage />
    </BrowserRouter>
  )

  const cards = screen.getAllByText(/View Details/i)
  expect(cards.length).toBeGreaterThan(0)
})
