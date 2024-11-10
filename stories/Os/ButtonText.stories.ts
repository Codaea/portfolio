import type { Meta, StoryObj } from '@storybook-vue/nuxt';
import Button from '~/components/Os/ButtonText.vue';

const meta: Meta<typeof Button> = {
    title: 'Os/Text Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        label: {
            control: 'text',
            defaultValue: 'Button Label',
        },
    }
};

export default meta;

type Story = StoryObj<typeof Button>;
// Default story
export const Primary: Story = {
    args: {
        label: 'Primary Button',
    }
}

