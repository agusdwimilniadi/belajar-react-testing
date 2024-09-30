import React from 'react';
import { it, expect, describe, beforeAll, afterAll } from 'vitest';
import {  render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import ProductList from '../../src/components/ProductList'
import { delay, http, HttpResponse } from 'msw';
import { server } from '../mocks/server';
import { db } from '../mocks/db';
import AllProvider from '../AllProvider';

describe('Product List', () => {
    const productId:number[] = []
    beforeAll(() => {
        [1,2,3].forEach(() => {
            const product = db.product.create()
            productId.push(product.id)
        })
    })

    afterAll(() => {
        db.product.deleteMany({
            where:{
                id:{
                    in:productId
                }
            }
        })

    })


    it('should render list of item', async () => {
        render(<ProductList/>,{wrapper:AllProvider})
        const items = await screen.findAllByRole('listitem');
        expect(items.length).toBeGreaterThan(0)
    })

    it('should render no products if there are no products', async() => {
        server.use(
            http.get('/products', () => HttpResponse.json([]))
        )
        render(<ProductList/>,{wrapper:AllProvider})
        const text = await screen.findByText(/no products/i)
        expect(text).toBeInTheDocument()
    })

    it('should render an error if there is an error',  async () => {
        server.use(http.get('/products', () => HttpResponse.error()))
        render(<ProductList/>,{wrapper:AllProvider})

        const text = await screen.findByText(/error/i)
        expect(text).toBeInTheDocument()
    })

    it('should render a loading state when fetching the data', async() => {
        server.use(http.get('/products', async() => {
            await delay()
            return HttpResponse.json([])
        }))
        render(<ProductList/>,{wrapper:AllProvider})

        expect(await screen.findByText(/loading/i)).toBeInTheDocument()
    })
    it('should render a loading state when fetching the data error', async() => {
        server.use(http.get('/product', () => HttpResponse.error()))

        render(<ProductList/>,{wrapper:AllProvider})

        await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))
    })
})