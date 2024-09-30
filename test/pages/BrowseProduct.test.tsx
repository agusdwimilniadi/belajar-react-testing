import React from 'react';
import { it, expect, describe } from 'vitest';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Theme } from '@radix-ui/themes'
import BrowseProductPage from '../../src/pages/BrowseProductsPage'
import { server } from '../mocks/server';
import { delay, http, HttpResponse } from 'msw';


describe('Browse Product Page', () => {
    const renderComponents = () => {
        render(
            <Theme>
                <BrowseProductPage />
            </Theme>
        )
    }
    it('should render loading categories skeleton when fetching', async () => {
        server.use(
            http.get('/categories', async() => {
                await delay()
                return HttpResponse.json([])
            })
        )
        renderComponents()

        const skeleton = await screen.findByRole('progressbar', { name:'category' })
        expect(skeleton).toBeInTheDocument()
    })

    it('should remove skeleton when data is fetched', async () => {
        renderComponents()

        await waitForElementToBeRemoved(() => screen.queryByRole('progressbar', { name:'category' }))

    })

    it('should render loading product skeleton when fetching', () => {
        server.use(
            http.get('/products', async () => {
                await delay()
                return HttpResponse.json([])
            })
        )
        renderComponents()

        const skeleton = screen.getByRole('progressbar', { name:'products' })
        expect(skeleton).toBeInTheDocument()
    })

    it('should remove skeleton when data product is fetched', async () => {
        renderComponents()
        await waitForElementToBeRemoved(() => screen.queryByRole('progressbar', { name:'products' }))
    })

    it('should error tobe in the document when categories error to fetched', async() => {
        server.use(http.get('/categories', () => HttpResponse.error()))
        renderComponents()

        await waitForElementToBeRemoved(() => screen.queryByRole('progressbar', { name:'category' }))

        expect(screen.queryByText(/error/i)).not.toBeInTheDocument()
        expect(screen.queryByRole('combobox', { name:'category' })).not.toBeInTheDocument()
    })
})