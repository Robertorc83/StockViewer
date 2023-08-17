import { Meta, StoryObj } from '@storybook/react';
import FavoriteTable from './FavoriteTable';
import { Provider } from 'react-redux';
import store from '../../redux/store'; // make sure to update this path to your actual store

const meta: Meta = {
    title: 'Base-Components/FavoriteTable',
    component: FavoriteTable,
    tags: ['autodocs'],
    decorators: [(Story) => <Provider store={store}><Story/></Provider>],
    argTypes: {},
} satisfies Meta<typeof FavoriteTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {}; 