import React from "react"
import { it, expect, describe } from 'vitest'
import { User } from '../../src/entities'
import { render, screen } from '@testing-library/react'
import UserAccount from '../../src/components/UserAccount'


describe('User Account', () => {
    it('should render username  when name is provided', () => {
        const user : User = {
            id: 1,
            name: 'Agus'
        }
        render(<UserAccount user={user}/>)
        // screen.debug()
        expect(screen.getByText(user.name)).toBeInTheDocument()
    })

    it('shound render button when user is admin', () => {
        const user:User = {
            id: 1,
            name: 'Agus',
            isAdmin: true
        }
        render(<UserAccount user={user}/>)
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument()
        expect(button).toHaveTextContent(/edit/i)
    })

    it('should not render button when user is not admin', () => {
        const user:User = {
            id: 1,
            name: 'Agus',
        }
        render(<UserAccount user={user}/>)
        const button = screen.queryByRole('button');
        expect(button).not.toBeInTheDocument()
    })

})