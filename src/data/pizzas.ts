export type Pizza = {
  id: string;
  name: string;
  price: number;
  description: string;
};

export const CURATED_PIZZAS: Pizza[] = [
  {
    id: 'margherita',
    name: 'Margherita',
    price: 12.5,
    description: 'San Marzano tomato, fresh mozzarella, basil, extra virgin olive oil.',
  },
  {
    id: 'pepperoni',
    name: 'Pepperoni',
    price: 14.0,
    description: 'Tomato sauce, mozzarella, spicy pepperoni, oregano.',
  },
  {
    id: 'quattro-formaggi',
    name: 'Quattro Formaggi',
    price: 15.5,
    description: 'Mozzarella, gorgonzola, fontina, parmesan.',
  },
  {
    id: 'funghi',
    name: 'Funghi',
    price: 13.5,
    description: 'Tomato sauce, mozzarella, roasted mushrooms, thyme.',
  },
  {
    id: 'diavola',
    name: 'Diavola',
    price: 14.5,
    description: 'Tomato sauce, mozzarella, spicy salami, chili flakes.',
  },
  {
    id: 'prosciutto-e-rucola',
    name: 'Prosciutto e Rucola',
    price: 16.0,
    description: 'Mozzarella, prosciutto crudo, arugula, shaved parmesan.',
  },
];
