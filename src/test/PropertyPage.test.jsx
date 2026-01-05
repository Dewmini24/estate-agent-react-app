import { render, screen } from '@testing-library/react'
import PropertyPage from '../pages/PropertyPage'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

test('loads property details page', () => {
  render(
    <MemoryRouter initialEntries={['/property/prop1']}>
      <Routes>
        <Route path="/property/:id" element={<PropertyPage />} />
      </Routes>
    </MemoryRouter>
  )

  expect(screen.getByText('3')).toBeInTheDocument()
})
