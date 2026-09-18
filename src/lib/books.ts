export type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  rating: number;
  available: number;
  total: number;
  pricePerDay: number;
  cover: string;
  accent: string;
  featured?: boolean;
};

export const categories = ["Tất cả", "Văn học", "Kinh doanh", "Kỹ năng", "Thiếu nhi"];

export const books: Book[] = [
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Kỹ năng",
    description: "Những thay đổi nhỏ tạo nên khác biệt lớn trong thói quen mỗi ngày.",
    rating: 4.9,
    available: 7,
    total: 12,
    pricePerDay: 12000,
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=700&q=85",
    accent: "#d95d39",
    featured: true,
  },
  {
    id: "norwegian-wood",
    title: "Norwegian Wood",
    author: "Haruki Murakami",
    category: "Văn học",
    description: "Một câu chuyện trưởng thành dịu dàng, buồn và rất đỗi ám ảnh.",
    rating: 4.8,
    available: 4,
    total: 8,
    pricePerDay: 10000,
    cover: "https://images.unsplash.com/photo-1511108690759-009324a90311?auto=format&fit=crop&w=700&q=85",
    accent: "#52796f",
    featured: true,
  },
  {
    id: "psychology-money",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Kinh doanh",
    description: "Tư duy tài chính không nằm ở công thức, mà ở cách ta nhìn cuộc sống.",
    rating: 4.7,
    available: 9,
    total: 10,
    pricePerDay: 15000,
    cover: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=700&q=85",
    accent: "#bc8a5f",
  },
  {
    id: "the-alchemist",
    title: "Nhà giả kim",
    author: "Paulo Coelho",
    category: "Văn học",
    description: "Hành trình đi tìm kho báu và lắng nghe tiếng nói bên trong mình.",
    rating: 4.9,
    available: 2,
    total: 6,
    pricePerDay: 9000,
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=700&q=85",
    accent: "#e0a458",
  },
  {
    id: "design-everyday",
    title: "The Design of Everyday Things",
    author: "Don Norman",
    category: "Kỹ năng",
    description: "Khi thiết kế tốt khiến những điều phức tạp trở nên tự nhiên.",
    rating: 4.6,
    available: 5,
    total: 7,
    pricePerDay: 14000,
    cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=700&q=85",
    accent: "#386641",
  },
  {
    id: "little-prince",
    title: "Hoàng tử bé",
    author: "Antoine de Saint-Exupéry",
    category: "Thiếu nhi",
    description: "Cuốn sách nhỏ cho những người lớn vẫn còn giữ một vì tinh tú.",
    rating: 5,
    available: 6,
    total: 9,
    pricePerDay: 8000,
    cover: "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?auto=format&fit=crop&w=700&q=85",
    accent: "#5c80bc",
  },
];

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(value);
