import { render, screen, fireEvent } from '@testing-library/react'
import SearchPage from '../pages/SearchPage'
import { BrowserRouter } from 'react-router-dom'

test('adds property to favorites', () => {
  render(
    <BrowserRouter>
      <SearchPage />
    </BrowserRouter>
  )

  const favoriteButton = screen.getAllByText('☆')[0]
  fireEvent.click(favoriteButton)

  expect(screen.getByText(/Favorites \(1\)/i)).toBeInTheDocument()
})

test('prevents duplicate favorites', () => {
  render(
    <BrowserRouter>
      <SearchPage />
    </BrowserRouter>
  )

  const favoriteButton = screen.getAllByText('☆')[0]
  fireEvent.click(favoriteButton)
  fireEvent.click(favoriteButton)

  expect(screen.getByText(/Favorites \(1\)/i)).toBeInTheDocument()
})
