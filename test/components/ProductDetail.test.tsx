import React from 'react';
import { it, expect, describe, beforeAll, afterAll } from 'vitest';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import ProductDetail from '../../src/components/ProductDetail'
import { server } from '../mocks/server';
import { delay, http, HttpResponse } from 'msw';
import { db } from '../mocks/db';
import AllProvider from '../AllProvider';


describe('Product Detail', () => {
    let productId:number;
    beforeAll(() => {
        const product = db.product.create()
        productId = product.id
    })
    afterAll(() => {
        db.product.delete({
            where:{
                id:{
                    equals:productId
                }
            }
        })
    })
    it('should render a product detail', async() => {
        const prod = db.product.findFirst({
            where:{
                id:{
                    equals:productId
                }
            }
        })
        render(<ProductDetail productId={productId}/>, {wrapper:AllProvider})
        const productName = await screen.findByText(new RegExp(prod!.name))
        const price = await screen.findByText(new RegExp(prod!.price.toString()))
        expect(productName).toBeInTheDocument();
        expect(price).toBeInTheDocument();
    })

    it('should render not found if product not found', async() => {
        server.use(
            http.get('/products/1', () => HttpResponse.json(null))
        )
        render(<ProductDetail productId={1}/>, {wrapper:AllProvider})
        const text = await screen.findByText(/not found/i)
        expect(text).toBeInTheDocument()
    })

    it('should render error if invalid', () => {
        render(<ProductDetail productId={0}/>, {wrapper:AllProvider})
        const text = screen.getByText(/invalid/i)
        expect(text).toBeInTheDocument()
    })
    it('should render loading when fetching', async() => {
        server.use(
            http.get('/products/1', async() => {
                await delay()
                return HttpResponse.json({})
            })
        )
        render(<ProductDetail productId={1}/>, {wrapper:AllProvider})

        const text = await screen.findByText(/loading/i)
        expect(text).toBeInTheDocument()
    })

    it('should render a loading state when fetching the data error', async() => {
        server.use(http.get('/products/1', () => HttpResponse.error()))

        render(<ProductDetail productId={1}/>, {wrapper:AllProvider})

        await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))
    })

})