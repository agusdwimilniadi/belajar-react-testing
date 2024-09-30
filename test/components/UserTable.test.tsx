import React from 'react';
import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';

import UserTable from '../../src/components/UserTable';
import { User } from '../../src/entities'




describe('User Table', () => {
    it('should render no users if there are no users', () => {
        render(<UserTable users={[]}/>)

        expect(screen.getByText(/no users/i)).toBeInTheDocument();
    })

    it('should render user list if there are users', () => {
        const users: User[] = [
            {
                id:1,
                name:"Agus"
            },
            {
                id:2,
                name:"Budi"
            }
        ];
        render(<UserTable users={users}/>)

        users.forEach((user) => {
            const name = screen.getByRole('cell',{name:user.name})
            expect(name).toBeInTheDocument()
        })

    })
})