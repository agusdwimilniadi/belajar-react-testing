import React from 'react';
import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import TagList from "../../src/components/TagList";


describe('TagList', () => {
    it('should render a taglist with 3 tag', async () => {
        render(<TagList />)


        // await waitFor(() => {
        //     const tags = screen.getAllByRole('listitem')
        //     expect(tags).toHaveLength(3)
        // })

        const tags = await screen.findAllByRole('listitem')
        expect(tags).toHaveLength(3)
    })
})