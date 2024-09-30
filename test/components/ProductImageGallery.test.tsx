import React from 'react';
import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductImageGallery from '../../src/components/ProductImageGallery'

describe('Product Image Gallery', () => {
    it('should render null when imageUrls is empty', () => {
        render(<ProductImageGallery imageUrls={[]} />)
        const images = screen.queryByRole('img');
        expect(images).toBeNull()
    })

    it('should render list of images', () => {
        const urls = ['url1', 'url2', 'url3']
        render(<ProductImageGallery imageUrls={urls} />)
        const images = screen.getAllByRole('img');
        expect(images).toHaveLength(urls.length)

    })
})