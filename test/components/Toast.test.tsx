import React from 'react';
import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import {Toaster} from 'react-hot-toast'
import ToastDemo from '../../src/components/ToastDemo'
import userEvent from '@testing-library/user-event'


describe('Toast', () => {
    it('should render toast when toaster is clicked', async () => {
        render(
            <>
                <Toaster/>
                <ToastDemo/>
            </>
        )
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument()

        await userEvent.setup()

        await userEvent.click(button)
        expect(await screen.findByText(/Success/i)).toBeInTheDocument()
    })
})