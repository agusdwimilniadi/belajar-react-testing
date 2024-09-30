import React from 'react'
import { it, expect, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import Greet from '../../src/components/Greet'



describe('Greet Components', () => {
    it('should render Hello with name when name is provided in props', () => {
        render(<Greet name="Agus" />);
        // screen.debug()
        const heading = screen.getByRole('heading')
        expect(heading).toBeInTheDocument()
        expect(heading).toHaveTextContent(/hello agus/i)
    })

    it('should render button when name is not provided', () => {
        render(<Greet  />);
        // screen.debug()
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
        expect(button).toHaveTextContent(/login/i)
    })
})