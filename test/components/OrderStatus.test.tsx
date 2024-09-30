import React from 'react';
import { it, expect, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import OrderStatusSelector from '../../src/components/OrderStatusSelector'
import { Theme } from '@radix-ui/themes';
import {userEvent} from '@testing-library/user-event'


describe('Order Status', () => {
    const renderCompoent = () => {
        const onChange = vi.fn()
        render(<>
            <Theme>
                <OrderStatusSelector onChange={onChange}/>
            </Theme>
        </>)
        return {
            trigger: screen.getByRole('combobox'),
            getOptions: () => screen.findAllByRole('option'),
            user : userEvent.setup(),
            onChange: onChange
        }
    }
    it('should render new as the default value', async () => {
        const { trigger, getOptions, user } = renderCompoent()
        expect(trigger).toHaveTextContent(/new/i)

        await user.click(trigger)

        const options = await getOptions()
        expect(options).toHaveLength(3)

        const labels = options.map(option => option.textContent)
        expect(labels).toEqual([ 'New', 'Processed', 'Fulfilled' ])

    })
    it.each([
        {label:/processed/i, value:'processed'},
        {label:/fulfilled/i, value:'fulfilled'},
    ])('should change the status when clicked', async({label, value}) => {
        const { trigger, user, onChange } = renderCompoent()

        user.click(trigger)
        const option = await screen.findByRole('option', {name: label})
        await user.click(option)
        expect(onChange).toHaveBeenCalledWith(value)

    })

})