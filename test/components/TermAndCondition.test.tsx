import React from 'react';
import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';


import TermAndConditions from '../../src/components/TermsAndConditions';
import userEvent from '@testing-library/user-event';

describe('Term and Conditions', () => {
    it('should render initial value in documents', () => {
        render(<TermAndConditions/>)

        const header = screen.getByRole('heading')
        expect(header).toBeInTheDocument()
        expect(header).toHaveTextContent(/terms & conditions/i)

        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeInTheDocument()
        expect(checkbox).not.toBeChecked()

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument()
        expect(button).toHaveTextContent(/submit/i)
        expect(button).toBeDisabled()
    })

    it('should enable and disable button when checkbox is checked', async() => {
        render(<TermAndConditions/>)

        const checkbox = screen.getByRole('checkbox');
        const button = screen.getByRole('button');
        const user = userEvent.setup();
        await user.click(checkbox)

        expect(checkbox).toBeChecked()
        expect(button).not.toBeDisabled()

        await user.click(checkbox)

        expect(checkbox).not.toBeChecked()
        expect(button).toBeDisabled()
    })
})