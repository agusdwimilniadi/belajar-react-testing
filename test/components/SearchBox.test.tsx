import React from 'react';
import { it, expect, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SearchBox from '../../src/components/SearchBox'
import userEvent from '@testing-library/user-event';


describe('Searchbox', () => {
    const renderSearchBox = () => {
        const onChange = vi.fn()
        render(<SearchBox onChange={onChange}  />)
        return {
            input: screen.getByPlaceholderText(/search/i),
            user: userEvent.setup(),
            onChange
        }
    }
    it('should render an input field for searching', () => {
        const { input } = renderSearchBox()
        expect(input).toBeInTheDocument();
    })
    it('should call method onchange when enter key is pressed', async() => {
        const { input, user, onChange } = renderSearchBox()

        const searchInput = "SearchInput test"
        await user.type(input, `${searchInput}{enter}`)
        expect(onChange).toHaveBeenCalledWith(searchInput)
    })

    it('should not call function if search input is empty ', async() => {
        const { input, user, onChange } = renderSearchBox()

        await user.type(input, `{enter}`)
        expect(onChange).not.toHaveBeenCalled()
    })

})