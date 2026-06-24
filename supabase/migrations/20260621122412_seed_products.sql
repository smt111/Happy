/*
# Seed real flower and gift products for Happy Gift and Flowers

Populates the products table with actual inventory items based on the business type (flower delivery, gifts). Categories: bouquets, arrangements, gift boxes, balloons, plants.
*/

INSERT INTO products (name, description, price, category, image_url, is_available) VALUES
('Red Rose Bouquet - 12 Stems', 'Classic dozen red roses hand-tied with eucalyptus and gypsophila, wrapped in premium kraft paper.', 1200.00, 'bouquets', 'https://images.pexels.com/photos/1187079/pexels-photo-1187079.jpeg?auto=compress&cs=tinysrgb&w=600', true),
('Pink Tulip Arrangement', 'Fresh pink tulips arranged in a glass vase with seasonal greenery. Perfect for spring celebrations.', 950.00, 'arrangements', 'https://images.pexels.com/photos/1488315/pexels-photo-1488315.jpeg?auto=compress&cs=tinysrgb&w=600', true),
('Mixed Seasonal Bouquet', 'A vibrant mix of seasonal blooms including daisies, carnations, and alstroemeria in cheerful colors.', 850.00, 'bouquets', 'https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=600', true),
('White Lily & Orchid Arrangement', 'Elegant white lilies paired with phalaenopsis orchids in a ceramic pot. Sophisticated and long-lasting.', 1800.00, 'arrangements', 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=600', true),
('Sunflower Bright Bouquet', 'Cheerful sunflowers mixed with yellow solidago and greenery. Brings sunshine to any room.', 750.00, 'bouquets', 'https://images.pexels.com/photos/1379636/pexels-photo-1379636.jpeg?auto=compress&cs=tinysrgb&w=600', true),
('Luxury Rose Box - 24 Stems', 'Two dozen premium roses arranged in a black gift box with satin ribbon. The ultimate romantic gesture.', 2500.00, 'gift-boxes', 'https://images.pexels.com/photos/5414818/pexels-photo-5414818.jpeg?auto=compress&cs=tinysrgb&w=600', true),
('Chocolate & Flower Gift Set', 'A beautiful bouquet paired with a box of Belgian chocolates. The perfect combination of sweet and beautiful.', 1500.00, 'gift-boxes', 'https://images.pexels.com/photos/4040590/pexels-photo-4040590.jpeg?auto=compress&cs=tinysrgb&w=600', true),
('Baby''s Breath Cloud Bouquet', 'Delicate baby''s breath arranged in a cloud-like formation. Ethereal and romantic.', 650.00, 'bouquets', 'https://images.pexels.com/photos/4622893/pexels-photo-4622893.jpeg?auto=compress&cs=tinysrgb&w=600', true),
('Exotic Orchid Plant', 'A potted phalaenopsis orchid plant that blooms for months. Low maintenance and stunning.', 1400.00, 'plants', 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=600', true),
('Heart-Shaped Rose Arrangement', 'Roses arranged in a heart shape within a decorative box. Perfect for anniversaries and Valentine''s Day.', 2200.00, 'gift-boxes', 'https://images.pexels.com/photos/931154/pexels-photo-931154.jpeg?auto=compress&cs=tinysrgb&w=600', true),
('Balloon & Flower Combo', 'Colorful helium balloons paired with a small bouquet. Great for birthdays and celebrations.', 1100.00, 'balloons', 'https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg?auto=compress&cs=tinysrgb&w=600', true),
('Succulent Garden Arrangement', 'A collection of beautiful succulents in a decorative wooden box. Long-lasting and modern.', 900.00, 'plants', 'https://images.pexels.com/photos/1445418/pexels-photo-1445418.jpeg?auto=compress&cs=tinysrgb&w=600', true),
('Purple Lavender Bouquet', 'Fragrant lavender stems tied with natural twine. Calming and beautifully scented.', 700.00, 'bouquets', 'https://images.pexels.com/photos/286763/pexels-photo-286763.jpeg?auto=compress&cs=tinysrgb&w=600', true),
('Teddy Bear & Roses Gift', 'A soft teddy bear paired with a mini rose bouquet. Adorable gift for someone special.', 1300.00, 'gift-boxes', 'https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg?auto=compress&cs=tinysrgb&w=600', true),
('Tropical Flower Arrangement', 'Bird of paradise, anthuriums, and heliconias arranged with monstera leaves. Exotic and bold.', 1600.00, 'arrangements', 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=600', true),
('Peony Perfection Bouquet', 'Lush peonies in soft pink and white. Seasonal availability, absolutely stunning when in bloom.', 2000.00, 'bouquets', 'https://images.pexels.com/photos/617967/pexels-photo-617967.jpeg?auto=compress&cs=tinysrgb&w=600', true);
