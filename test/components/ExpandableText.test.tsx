import React from 'react';
import { it, expect, describe } from 'vitest';
import {  render, screen } from '@testing-library/react';


import ExpandableText from '../../src/components/ExpandableText'
import userEvent from '@testing-library/user-event';


describe('Expandable Text', () => {
    const renderComponent = (text:string) => {
        render(<ExpandableText text={text} />)
        return {
            article: screen.getByRole('article'),
        }
    }
    it('should render text when size is less than 255', () => {
        const textDummy = "hellow"
        const { article } = renderComponent(textDummy)

        expect(article).toBeInTheDocument();
        expect(article).toHaveTextContent(textDummy);
    })

    it('should render text with ellipsis when size is more than 255', async() => {
        const textDummy = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae at nisi dolorum, laborum voluptatum sapiente ex rerum. Delectus repudiandae corporis veniam laboriosam quidem. Sunt dolore dolorum quam et, quod placeat voluptatem eveniet saepe. Voluptates ipsa illum fugiat, eos illo voluptatibus, tempore rem quia, sit commodi cupiditate officiis molestias. Ut, rerum?"
        render(<ExpandableText text={textDummy} />)

        const article = screen.getByRole('article');
        expect(article).toBeInTheDocument();
        expect(article).toHaveTextContent('...');

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(/Show More/i);

        const user = userEvent.setup();

        await user.click(button)

        expect(button).toHaveTextContent(/Show Less/i)
        expect(article).toHaveTextContent(textDummy)
        expect(article).not.toHaveTextContent('...')

        await user.click(button)

        expect(button).toHaveTextContent(/Show More/i)
        expect(article).toHaveTextContent('...')
    })

    it('should expand text when button is clicked and show less when text more than 255', () => {



    })
})